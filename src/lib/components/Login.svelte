<script>
    import {
      FluidForm,
      TextInput,
      PasswordInput,
      Button
    } from "carbon-components-svelte";
    import LoginIcon from "carbon-icons-svelte/lib/Login.svelte";
    import { navigate } from "svelte-routing";
    import {loggedIn, auth_token} from "./../../store/state";
    let username;
    let password;
    let loading=false;
    async function login(){
        loading=true;
        let result = await fetch("http://localhost:8000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });
        let data = await result.json();
        if(data.result === true){
            auth_token.set(data.token);
            loggedIn.set(true);
            navigate("/");
        }
        else{
            alert("Invalid credentials");
        }
    }
  </script>

<main>
  <FluidForm>
    <TextInput bind:value={username} labelText="User name" placeholder="Enter user name..." required />
    <PasswordInput
      required
      type="password"
      labelText="Password"
      placeholder="Enter password..."
      bind:value={password}
    />
  </FluidForm>
  <Button style="margin-top: 50px;" icon={LoginIcon} on:click={()=>{login()}}>Login</Button>

</main>