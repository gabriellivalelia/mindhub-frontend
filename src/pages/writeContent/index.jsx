import React from 'react';
import { SubHeader } from '../../components';
import { PageContainer, Container, Card, EditorRow, EditorArea, TitleInput, TextArea, PreviewArea, ButtonsRow } from './styles';
import Button from '@mui/material/Button';
import Colors from '../../globalConfigs/globalStyles/colors';
import { useForm } from 'react-hook-form';
import ReactMarkdown from 'react-markdown';
import rehypeSanitize from 'rehype-sanitize';

function WriteContent() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      title: '',
      text: '',
    }
  });

  const textValue = watch('text');

  const onSubmit = (data) => {
    // TODO: enviar para backend. Por enquanto, log
    console.log('Saved content', data);
    alert('Conteúdo salvo (simulado)');
  };

  return (
    <PageContainer>
      <SubHeader text="Escrever Conteúdo" />
      <Container>
        <Card>
          <form onSubmit={handleSubmit(onSubmit)}>
            <EditorRow>
              <EditorArea>
                <TitleInput
                  placeholder="Título"
                  {...register('title', { required: 'Título é obrigatório', minLength: { value: 3, message: 'Título muito curto' } })}
                />
                {errors.title && <div style={{ color: 'red', fontSize: 12 }}>{errors.title.message}</div>}

                <TextArea
                  placeholder="Escreva seu texto aqui (Markdown suportado)"
                  {...register('text', { required: 'Texto é obrigatório', minLength: { value: 10, message: 'Escreva pelo menos 10 caracteres' } })}
                />
                {errors.text && <div style={{ color: 'red', fontSize: 12 }}>{errors.text.message}</div>}

                <ButtonsRow>
                  <Button variant="contained" type="submit" sx={{ backgroundColor: Colors.ORANGE, color: Colors.WHITE, textTransform: 'none' }}>
                    Salvar
                  </Button>
                </ButtonsRow>
              </EditorArea>

              <PreviewArea>
                <ReactMarkdown rehypePlugins={[rehypeSanitize]}>{textValue || ''}</ReactMarkdown>
              </PreviewArea>
            </EditorRow>
          </form>
        </Card>
      </Container>
    </PageContainer>
  );
}

export default WriteContent;
