<script>
    import {
      DataTable,
      Toolbar,
      ToolbarContent,
      ToolbarSearch,
      Pagination,
    } from "carbon-components-svelte";
    import { navigate } from "svelte-routing";
    import {loggedIn, auth_token} from "./../../store/state";
    if(!$loggedIn){
        navigate("/");
    window.location.reload();

    }
    let rows =[]
    let loading = true;
    async function getItems(){
        let result = await fetch("http://localhost:8000/items", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
            token: $auth_token,
            }),
        });
        let data = await result.json();
        console.log(data);
        if(data.result === true){
            loading = false;
            rows = data.items;
        }
        else{
            alert("Invalid credentials");
        }
    }
    getItems();
    let pageSize = 5;
    let page = 1;
    let filteredRowIds = [];
  
    $: console.log("filteredRowIds", filteredRowIds);
  </script>
  
  {#if loading}
    <h1>Loading Data. Please Wait...</h1>
  {:else}
  <DataTable
  style="width: 1000px;"
  sortable
  title="Items List"
  description="You can search and sort this table."
  headers={[
    { key: "id", value: "ID" },
    { key: "name", value: "Name" },
    { key: "description", value: "Decription" },
    { key: "price", value: "Price" },
    { key: "quantity", value: "Quantity" },
  ]}
  {rows}
  {pageSize}
  {page}
>
  <Toolbar>
    <ToolbarContent>
      <ToolbarSearch
        persistent
        value=""
        shouldFilterRows
        bind:filteredRowIds
      />
    </ToolbarContent>
  </Toolbar>
</DataTable>

<Pagination
  bind:pageSize
  bind:page
  totalItems={filteredRowIds.length}
  pageSizeInputDisabled
/>

  {/if}
  