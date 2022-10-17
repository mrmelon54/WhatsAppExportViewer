<script>
  import Dialog, {Title, Content, Actions} from "@smui/dialog";
  import Button from "@smui/button";

  export let open;
  export let title;
  export let description;
</script>

<div class="error-dialog">
  <Dialog bind:open on:close={() => (open = false)} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
    <Title id="alert-dialog-title">{title}</Title>
    <Content>
      <div id="alert-dialog-description">{description}</div>
    </Content>
    <Actions>
      <Button onClick={() => (open = false)} color="primary">OK</Button>
    </Actions>
  </Dialog>
</div>

<style>
  .error-dialog {
    z-index: 999;
  }
</style>
