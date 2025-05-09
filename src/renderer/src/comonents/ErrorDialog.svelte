<script lang="ts">
  import Dialog, {Title, Content, Actions} from "@smui/dialog";
  import Button from "@smui/button";

  let { open = $bindable(), title, description } = $props();
</script>

<div class="error-dialog">
  <Dialog bind:open onclose={() => (open = false)} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
    <Title id="alert-dialog-title">{title}</Title>
    <Content>
      <div id="alert-dialog-description">{description}</div>
    </Content>
    <Actions>
      <Button onclick={() => (open = false)} color="primary">OK</Button>
    </Actions>
  </Dialog>
</div>

<style>
  .error-dialog {
    z-index: 999;
  }
</style>
