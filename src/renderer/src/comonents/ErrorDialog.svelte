<script>
  import Dialog, {Title, Content, Actions} from "@smui/dialog";
  import Button from "@smui/button";

  export let open;
  export let title;
  export let description;
</script>

<Dialog bind:open on:close={() => this.hideDialog()} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
  <Title id="alert-dialog-title">{title}</Title>
  <Content>
    <div id="alert-dialog-description">{description}</div>
  </Content>
  <Actions>
    <Button onClick={() => this.hideDialog()} color="primary">OK</Button>
  </Actions>
</Dialog>
