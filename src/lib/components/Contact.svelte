<script>
  import {
    FluidForm,
    TextInput,
    NumberInput,
    Button,
  } from "carbon-components-svelte";
  import AddIcon from "carbon-icons-svelte/lib/Email.svelte";
  import BackIcon from "carbon-icons-svelte/lib/Redo.svelte";
  import { navigate } from "svelte-routing";
  import { loggedIn, auth_token } from "./../../store/state";

  if (!$loggedIn) {
    navigate("/");
    window.location.reload();
  }

  let name = "";
  let email = "";
  let title = "";
  let message = "";

  function isValidateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  let loading = false;
  async function send() {
    loading = true;
    let result = await fetch("http://localhost:8000/sendMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: $auth_token,
        name: name,
        email: email,
        title: title,
        message: message,
      }),
    });
    let data = await result.json();
    console.log(data);
    if (data.result === true) {
      alert("Message sent successfully");
      navigate("/", { replace: true });
    } else {
      alert("Could not send message");
      name = "";
      email = "";
      title = "";
      message = "";
    }
  }
</script>

<main>
  <FluidForm>
    <TextInput
      bind:value={name}
      labelText="Name"
      placeholder="Enter your name..."
      required
    />
    <div style="height: 10px;" />
    <TextInput
      bind:value={email}
      type="email"
      invalid={!isValidateEmail(email) && email.length > 0}
      labelText="Email"
      placeholder="Enter your email..."
      required
    />
    <div style="height: 10px;" />
    <TextInput
      bind:value={title}
      labelText="Title"
      placeholder="Enter your feedback title..."
      required
    />
    <div style="height: 10px;" />
    <TextInput
      bind:value={message}
      labelText="Message"
      placeholder="Enter your message..."
      required
    />
  </FluidForm>
  <Button
    style="margin-top: 50px;"
    icon={AddIcon}
    disabled={loading ||
      !isValidateEmail(email) ||
      email.length === 0 ||
      name.length === 0 ||
      title.length === 0 ||
      message.length === 0}
    on:click={() => {
      send();
    }}>Send Message</Button
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
