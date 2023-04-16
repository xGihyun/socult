<script lang="ts">
  import user from '../user';
  let email: String = "";
  let password: String = "";
  
  const login = async () => {
    try {
      let response = await fetch('http://localhost:3030/api/auth/login', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      })
      // Anything under 299 is OK
      if (response.status < 299) {
        let data = response.json();
        user.update((val: any) => val = {...data});
      } else if (response.status > 299) { // Anything over 299 is NOT OK
        console.log("Something not quite right with server");
      } 
    } catch (error) { // ERROR
        console.log("Error logging in: ", error);
    }
  }
</script>

<h1>Login</h1>

<form on:submit|preventDefault={login}>
  <div>
    <input placeholder="Email" type="text" id="email" bind:value={email}>
  </div>
  
  <div>
    <input placeholder="Password" type="password" id="password" bind:value={password}>
  <button type="submit">Submit</button>
  </div>
</form>
