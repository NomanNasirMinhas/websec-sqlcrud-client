<script>
  import {
    FluidForm,
    TextInput,
    NumberInput,
    Button,
  } from "carbon-components-svelte";
  import AddIcon from "carbon-icons-svelte/lib/Add.svelte";
  import BackIcon from "carbon-icons-svelte/lib/Redo.svelte";
  import { navigate } from "svelte-routing";
  import { loggedIn, auth_token } from "./../../store/state";

  if (!$loggedIn) {
    navigate("/");
    window.location.reload();
  }

  let itemID=0;
  let itemName = "";
  let itemDesc = "";
  let itemPrice = 1;
  let itemQuant = 1;

  let loading = false;
  async function login() {
    loading = true;
    let result = await fetch("http://localhost:8000/addItem", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: $auth_token,
        id: itemID,
        name: itemName,
        description: itemDesc,
        price: itemPrice,
        quantity: itemQuant,
      }),
    });
    let data = await result.json();
    if (data.result === true) {
      alert("Item added successfully");
      navigate("/", { replace: true });
    } else {
      alert("Could not add item");
      itemID = 0;
      itemName = "";
      itemDesc = "";
      itemPrice = 1;
      itemQuant = 1;
    }
  }
</script>

<main>
  <FluidForm>
    <p style="text-align: justify;">Item ID</p>
    <NumberInput
      size="xl"
      hideSteppers
      hideLabel
      min={0}
      label="Item ID"
      value={itemID}
      on:change={(e) => {
        itemID = e.detail;
      }}
    />
    <div style="height: 10px;" />
    <p style="text-align: justify;">Item Name</p>
    <TextInput
      bind:value={itemName}
      labelText="Item Name"
      hideLabel
      placeholder="Enter item name..."
      required
    />
    <div style="height: 10px;" />
    <p style="text-align: justify;">Item Description</p>
    <TextInput
      bind:value={itemDesc}
      labelText="Item Description"
      hideLabel
      placeholder="Enter item description..."
      required
    />
    <div style="height: 10px;" />
    <p style="text-align: justify;">Item Price</p>
    <NumberInput
      size="xl"
      hideSteppers
      hideLabel
      min={0.1}
      label="Item Price"
      value={itemPrice}
      on:change={(e) => {
        itemPrice = e.detail;
      }}
    />
    <div style="height: 10px;" />
    <p style="text-align: justify;">Item Quantity</p>
    <NumberInput
      size="xl"
      hideSteppers
      hideLabel
      min={1}
      label="Item Quantity"
      value={itemQuant}
      on:change={(e) => {
        itemQuant = e.detail;
      }}
    />
  </FluidForm>
  <Button
    style="margin-top: 50px;"
    icon={AddIcon}
    disabled={loading ||
      itemID < 1||
      itemName.length < 1||
      itemDesc.length <1 ||
      itemPrice < 0 ||
      itemQuant < 1}
    on:click={() => {
      login();
    }}>Add Item</Button
  >

  <Button
    style="margin-top: 50px;"
    kind="danger"
    icon={BackIcon}
    on:click={() => {
      navigate("/");
    }}>Go Back</Button
  >
</main>
