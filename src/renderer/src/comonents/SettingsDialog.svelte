<script>
  import Dialog, {Title, Content, Actions} from "@smui/dialog";
  import Button from "@smui/button";
  import {config} from "../utils/stores";
  import Textfield from "@smui/textfield";

  export let open;
  let firstName;

  config.subscribe(x => {
    firstName = x.firstName;
  });

  function saveConfig() {
    config.update(x => {
      x.firstName = firstName;
      return x;
    });
    open = false;
  }
</script>

<div class="settings-dialog">
  <Dialog bind:open on:close={() => (open = false)} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
    <Title id="alert-dialog-title">Settings</Title>
    <Content>
      <div id="alert-dialog-description">The name below it used to detect which user shows on the right-hand side.</div>
      <Textfield type="text" bind:value={firstName} label="Name" style="min-width: 250px;" />
    </Content>
    <Actions>
      <Button on:click={() => (open = false)} color="secondary">Cancel</Button>
      <Button on:click={() => saveConfig()} color="secondary">Save</Button>
    </Actions>
  </Dialog>
</div>

<style>
  .settings-dialog {
    z-index: 999;
  }
</style>
