import React, { useEffect } from "react";
import { SubHeader } from "../../components";
import {
  PageContainer,
  Container,
  Card,
  EditorRow,
  EditorArea,
  TitleInput,
  TextArea,
  PreviewArea,
  ButtonsRow,
} from "./styles";
import Button from "@mui/material/Button";
import Colors from "../../globalConfigs/globalStyles/colors";
import { useForm } from "react-hook-form";
import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  useCreateContent,
  useUpdateContent,
  useContent,
} from "../../services/useContents";
import { useToastStore } from "../../stores/useToastStore";
import CircularProgress from "@mui/material/CircularProgress";

/**
 * Componente WriteContent - Página de criação/edição de conteúdos educacionais.
 *
 * Permite que psicólogos criem ou editem artigos em formato Markdown.
 *
 * Funcionalidades:
 * - Editor de texto com suporte a Markdown
 * - Preview em tempo real do conteúdo formatado
 * - Modo criação: Novo conteúdo
 * - Modo edição: Editar conteúdo existente (via query param ?edit=id)
 * - Validação de campos obrigatórios
 * - Sanitização de HTML para segurança
 * - Navegação de volta para lista de conteúdos
 *
 * Acesso:
 * - Restrito a psicólogos
 *
 * @component
 * @returns {JSX.Element} Página de editor de conteúdo
 *
 * @example
 * // Criar novo conteúdo
 * /write-content
 *
 * // Editar conteúdo existente
 * /write-content?edit=123
 */
function WriteContent() {
  const navigate = useNavigate();
  const addToast = useToastStore((state) => state.addToast);
  const [searchParams] = useSearchParams();
  const editId = searchParams.get("edit");

  const { data: existingContent, isLoading: loadingContent } =
    useContent(editId);
  const createContentMutation = useCreateContent();
  const updateContentMutation = useUpdateContent();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      body: "",
    },
  });

  useEffect(() => {
    if (existingContent) {
      reset({
        title: existingContent.title || "",
        body: existingContent.body || "",
      });
    }
  }, [existingContent, reset]);

  const textValue = watch("body");

  const onSubmit = async (data) => {
    try {
      if (editId) {
        await updateContentMutation.mutateAsync({
          contentId: editId,
          data: {
            title: data.title,
            body: data.body,
          },
        });
        addToast("Conteúdo atualizado com sucesso!", "success");
      } else {
        await createContentMutation.mutateAsync({
          title: data.title,
          body: data.body,
        });
        addToast("Conteúdo criado com sucesso!", "success");
      }

      setTimeout(() => {
        navigate("/contents");
      }, 1500);
    } catch (error) {
      console.error("Erro ao salvar conteúdo:", error);
      addToast("Erro ao salvar conteúdo. Tente novamente.", "error");
    }
  };

  if (editId && loadingContent) {
    return (
      <PageContainer>
        <SubHeader text="Escrever Conteúdo" />
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
      <SubHeader text={editId ? "Editar Conteúdo" : "Escrever Conteúdo"} />
      <Container>
        <Card>
          <form onSubmit={handleSubmit(onSubmit)}>
            <EditorRow>
              <EditorArea>
                <TitleInput
                  placeholder="Título"
                  {...register("title", {
                    required: "Título é obrigatório",
                    minLength: { value: 3, message: "Título muito curto" },
                  })}
                />
                {errors.title && (
                  <div style={{ color: "red", fontSize: 12 }}>
                    {errors.title.message}
                  </div>
                )}

                <TextArea
                  placeholder="Escreva seu texto aqui (Markdown suportado)"
                  {...register("body", {
                    required: "Texto é obrigatório",
                    minLength: {
                      value: 10,
                      message: "Escreva pelo menos 10 caracteres",
                    },
                  })}
                />
                {errors.body && (
                  <div style={{ color: "red", fontSize: 12 }}>
                    {errors.body.message}
                  </div>
                )}

                <ButtonsRow>
                  <Button
                    variant="outlined"
                    onClick={() => navigate("/contents")}
                    sx={{
                      borderColor: Colors.GREY,
                      color: Colors.GREY,
                      textTransform: "none",
                      marginRight: "1rem",
                      "&:hover": {
                        borderColor: Colors.DARK_GREY,
                        backgroundColor: Colors.LIGHT_GREY,
                      },
                    }}
                  >
                    Cancelar
                  </Button>
                  <Button
                    variant="contained"
                    type="submit"
                    sx={{
                      backgroundColor: Colors.ORANGE,
                      color: Colors.WHITE,
                      textTransform: "none",
                      "&:hover": {
                        backgroundColor: Colors.BROWN,
                      },
                    }}
                    disabled={
                      createContentMutation.isPending ||
                      updateContentMutation.isPending
                    }
                  >
                    {createContentMutation.isPending ||
                    updateContentMutation.isPending
                      ? "Salvando..."
                      : "Salvar"}
                  </Button>
                </ButtonsRow>
              </EditorArea>

              <PreviewArea>
                <div
                  style={{
                    marginBottom: "1rem",
                    fontWeight: "bold",
                    color: Colors.GRAY,
                  }}
                >
                  Preview:
                </div>
                <ReactMarkdown rehypePlugins={[rehypeSanitize]}>
                  {textValue || "*Seu conteúdo aparecerá aqui...*"}
                </ReactMarkdown>
              </PreviewArea>
            </EditorRow>
          </form>
        </Card>
      </Container>
    </PageContainer>
  );
}

export default WriteContent;
