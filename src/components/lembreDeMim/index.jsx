import { Container, Label, Input } from "./style";

function LembrarCheckbox({ lembrarUsuario, onChange }) {
  return (
    <Container>
      <Input type="checkbox" checked={lembrarUsuario} onChange={onChange} />
      <Label>Lembre de mim</Label>
    </Container>
  );
}

export default LembrarCheckbox;
