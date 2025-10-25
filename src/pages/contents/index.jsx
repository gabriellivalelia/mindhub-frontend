import React, { useState } from "react";
import {
  PageContainer,
  Container,
  Card,
  ContentList,
  ContentItem,
  ContentTitle,
  ContentExcerpt,
  SearchContainer,
  SearchIconWrapper,
  SearchBar,
} from "./styles";
import { SubHeader } from "../../components";
import Button from "@mui/material/Button";
import Colors from "../../globalConfigs/globalStyles/colors";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import { FontSizes } from "../../globalConfigs";
import { useContents, useDeleteContent } from "../../services/useContents";
import { useCurrentUser } from "../../services/useCurrentUser";
import { useToastStore } from "../../stores/useToastStore";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Pagination from "@mui/material/Pagination";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function Contents() {
  const navigate = useNavigate();
  const addToast = useToastStore((state) => state.addToast);
  const { data: currentUser } = useCurrentUser();

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const { data: contentsData, isLoading } = useContents({
    page,
    size: pageSize,
    title: searchTerm || undefined, // Backend usa "title" para filtrar
  });
  const deleteContentMutation = useDeleteContent();

  const isPsychologist = currentUser?.type === "psychologist";
  const contents = contentsData?.items || [];
  const totalPages = contentsData?.total_pages || 1;

  const openContent = (c) => {
    setSelected(c);
    setOpen(true);
  };

  const handleDelete = async (contentId, event) => {
    event.stopPropagation();
    if (!window.confirm("Tem certeza que deseja excluir este conteúdo?")) {
      return;
    }

    try {
      await deleteContentMutation.mutateAsync(contentId);
      addToast("Conteúdo excluído com sucesso!", "success");
      if (selected?.id === contentId) {
        setOpen(false);
      }
    } catch (error) {
      console.error("Erro ao excluir conteúdo:", error);
      addToast("Erro ao excluir conteúdo. Tente novamente.", "error");
    }
  };

  const handleEdit = (contentId, event) => {
    event.stopPropagation();
    navigate(`/write-content?edit=${contentId}`);
  };

  if (isLoading) {
    return (
      <PageContainer>
        <SubHeader text="Conteúdos" />
        <Container
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "50vh",
          }}
        >
          <CircularProgress style={{ color: Colors.ORANGE }} />
        </Container>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <SubHeader text="Conteúdos" />
      <Container>
        {/* Barra de busca e botão de criar */}
        <div
          style={{
            display: "flex",
            gap: "1rem",
            alignItems: "center",
            width: "100%",
          }}
        >
          <SearchContainer>
            <SearchIconWrapper>
              <SearchIcon sx={{ color: Colors.ORANGE }} />
            </SearchIconWrapper>
            <SearchBar
              placeholder="Buscar por título..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1); // Reset para primeira página ao buscar
              }}
            />
          </SearchContainer>

          {isPsychologist && (
            <Button
              variant="contained"
              onClick={() => navigate("/write-content")}
              sx={{
                backgroundColor: Colors.ORANGE,
                color: Colors.WHITE,
                textTransform: "none",
                whiteSpace: "nowrap",
                minWidth: "fit-content",
                "&:hover": {
                  backgroundColor: Colors.BROWN,
                },
              }}
            >
              + Escrever Conteúdo
            </Button>
          )}
        </div>

        <Card>
          {contents.length === 0 ? (
            <div
              style={{
                padding: "2rem",
                textAlign: "center",
                color: Colors.GRAY,
              }}
            >
              Nenhum conteúdo disponível no momento.
            </div>
          ) : (
            <ContentList>
              {contents.map((c) => (
                <ContentItem key={c.id} onClick={() => openContent(c)}>
                  <div style={{ flex: 1 }}>
                    <ContentTitle>{c.title}</ContentTitle>
                    <div
                      style={{
                        fontSize: "0.875rem",
                        color: Colors.GRAY,
                        marginTop: "0.25rem",
                        marginBottom: "0.5rem",
                      }}
                    >
                      Por: {c.author?.name || "Autor desconhecido"}
                    </div>
                    <ContentExcerpt>
                      {(c.body || "").slice(0, 140)}
                      {(c.body || "").length > 140 ? "..." : ""}
                    </ContentExcerpt>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "0.5rem",
                      alignItems: "center",
                    }}
                  >
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        openContent(c);
                      }}
                      size="small"
                      sx={{ color: Colors.ORANGE }}
                    >
                      <VisibilityIcon />
                    </IconButton>
                    {isPsychologist && c.author_id === currentUser?.id && (
                      <>
                        <IconButton
                          onClick={(e) => handleEdit(c.id, e)}
                          size="small"
                          sx={{ color: Colors.ORANGE }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          onClick={(e) => handleDelete(c.id, e)}
                          size="small"
                          sx={{ color: Colors.RED }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </>
                    )}
                  </div>
                </ContentItem>
              ))}
            </ContentList>
          )}

          {contents.length > 0 && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "1rem",
                borderTop: `1px solid ${Colors.LIGHT_GREY}`,
              }}
            >
              <Pagination
                count={Math.max(1, totalPages)}
                page={page}
                onChange={(e, value) => setPage(value)}
                sx={{
                  "& .MuiPaginationItem-root.Mui-selected": {
                    backgroundColor: Colors.ORANGE,
                    color: Colors.WHITE,
                  },
                }}
              />

              <FormControl
                sx={{
                  minWidth: 160,
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: Colors.ORANGE,
                  },
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                    { borderColor: Colors.ORANGE },
                }}
              >
                <InputLabel id="page-size-label">Linhas por página</InputLabel>
                <Select
                  size="small"
                  sx={{
                    height: 36,
                    "& .MuiSvgIcon-root": { color: Colors.ORANGE },
                  }}
                  labelId="page-size-label"
                  id="page-size"
                  value={pageSize}
                  label="Linhas por página"
                  onChange={(e) => {
                    setPageSize(e.target.value);
                    setPage(1); // Reset para primeira página ao mudar tamanho
                  }}
                >
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={20}>20</MenuItem>
                  <MenuItem value={50}>50</MenuItem>
                </Select>
              </FormControl>
            </div>
          )}
        </Card>
      </Container>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ color: Colors.ORANGE, fontSize: FontSizes.XLARGE }}>
          {selected?.title}
          <div
            style={{
              fontSize: "0.875rem",
              color: Colors.GRAY,
              fontWeight: "normal",
              marginTop: "0.5rem",
            }}
          >
            Por: {selected?.author?.name || "Autor desconhecido"}
          </div>
        </DialogTitle>
        <DialogContent>
          <ReactMarkdown rehypePlugins={[rehypeSanitize]}>
            {selected?.body || ""}
          </ReactMarkdown>
        </DialogContent>
      </Dialog>
    </PageContainer>
  );
}

export default Contents;
