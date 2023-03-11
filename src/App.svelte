<script>
  import "carbon-components-svelte/css/g100.css";
  import { Router, Route, navigate } from "svelte-routing";
  import Login from "./lib/components/Login.svelte";
  import Homepage from "./lib/components/Homepage.svelte";
  import Datapage from "./lib/components/Datapage.svelte";
  import AddItem from "./lib/components/AddItem.svelte";
  import Contact from "./lib/components/Contact.svelte";
  import {auth_token, loggedIn} from "./store/state";
  import { Header, SkipToContent, Content, HeaderUtilities, Button
  } from "carbon-components-svelte";  
</script>

<main style="height: 100vh; ">
  <Header company="222443" platformName="Noman Nasir Minhas">
    <svelte:fragment slot="skip-to-content">
      <SkipToContent />
    </svelte:fragment>
    <HeaderUtilities>
      {#if $loggedIn}
      <Button
          kind="primary"
          on:click={() => {
            navigate(`/`, {
              replace: true,
            });
          }}>Homepage</Button
        >
        <div style="width: 10px;" />
        <Button
          kind="primary"
          on:click={() => {
            navigate(`/addItem`, {
              replace: true,
            });
          }}>Add Item</Button
        >
        <div style="width: 10px;" />
        <Button
          kind="primary"
          on:click={() => {
            navigate(`/items`, {
              replace: true,
            });
          }}>View Items</Button>
        <div style="width: 10px;" />
        <Button
          kind="primary"
          on:click={() => {
            navigate(`/contact`, {
              replace: true,
            });
          }}>Contact Us</Button>
          <div style="width: 10px;" />
          <Button
            kind="danger"
            on:click={() => {
              loggedIn.set(false);
              auth_token.set("");
              navigate(`/contact`, {
                replace: true,
              });
            }}>Logout</Button>
      {/if}
    </HeaderUtilities>
  </Header>
  <Content>
    
    <h1 style="font-weight: bolder; margin-bottom: 50px;">
      Web Application Security
    </h1>
    
    <Router>
      <Route path="/">
        {#if $loggedIn}
          <Homepage />
        {:else}
          <Login />
        {/if}
      </Route>
      <Route path="/addItem" let:params>
        <AddItem />
      </Route>
      <Route path="/items">  
        <Datapage />
      </Route>
      <Route path="/contact">
        <Contact />
      </Route>
      <Route path="/*">
        {#if $loggedIn}
          <Homepage />
        {:else}
          <Login />
        {/if}
      </Route>
    </Router>
  </Content>
</main>
