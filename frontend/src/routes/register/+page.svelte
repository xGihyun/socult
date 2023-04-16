<script lang="ts">
    import user from "../../user";

  // import {goto} from '$app/navigation';
  // let username: String = '';
  let firstName: String = '';
  let lastName: String = '';
  let email: String = '';
  let password: String = '';

  const register = async () => {
    try {
      let response = await fetch('http://localhost:3030/api/auth/register', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password
        })
      })
      // Anything under 299 is OK
      if (response.status < 299) {
        let data = response.json();
        if (data) {
          user.update((val: any) => val = {...data});
        }
      } else if (response.status > 299) { // Anything over 299 is NOT OK
        console.log("Something not quite right with server");
      } 
    } catch (error) { // ERROR
        // currentError = error;
        console.log("Error logging in: ", error);
    }
  }

  
</script>

<div>Register Page</div>
<form on:submit|preventDefault={register}>
  <label>
    First Name
    <input name="firstName" type="text" bind:value={firstName}>
  </label> 
  <label>
    Last Name
    <input name="lastName" type="text" bind:value={lastName}>
  </label>
  <label>
    Email
    <input name="email" type="email" bind:value={email}>
  </label>
  <label>
    Password
    <input name="password" type="password" bind:value={password}>
  </label>
  <button>Register</button>
</form>
