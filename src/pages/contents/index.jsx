import React from 'react';
import { PageContainer, Container, Card, ContentList, ContentItem, ContentTitle, ContentExcerpt } from './styles';
import { SubHeader } from '../../components';
import Button from '@mui/material/Button';
import Colors from '../../globalConfigs/globalStyles/colors';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import ReactMarkdown from 'react-markdown';
import rehypeSanitize from 'rehype-sanitize';
import { FontSizes } from '../../globalConfigs';

const mockContents = [
  { id: 1, title: 'Como lidar com ansiedade', body: '# Ansiedade\n\nDicas para lidar com ansiedade... **respire**' },
  { id: 2, title: 'O que é terapia cognitivo-comportamental?', body: 'TCC é uma abordagem...\n\n- item 1\n- item 2' },
];

function Contents() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(null);

  const openContent = (c) => {
    setSelected(c);
    setOpen(true);
  };

  return (
    <PageContainer>
      <SubHeader text="Conteúdos" />
      <Container>
        <Card>
          <ContentList>
            {mockContents.map((c) => (
              <ContentItem key={c.id} onClick={() => openContent(c)}>
                <div>
                  <ContentTitle>{c.title}</ContentTitle>
                  <ContentExcerpt>{(c.body || '').slice(0, 140)}{(c.body || '').length > 140 ? '...' : ''}</ContentExcerpt>
                </div>
                <div>
                  <Button variant="outlined" sx={{ borderColor: Colors.ORANGE, color: Colors.ORANGE, textTransform: 'none' }}>Ver</Button>
                </div>
              </ContentItem>
            ))}
          </ContentList>
        </Card>
      </Container>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ color: Colors.ORANGE, fontSize: FontSizes.XLARGE }}>{selected?.title}</DialogTitle>
        <DialogContent>
          <ReactMarkdown rehypePlugins={[rehypeSanitize]}>{selected?.body || ''}</ReactMarkdown>
        </DialogContent>
      </Dialog>
    </PageContainer>
  );
}

export default Contents;