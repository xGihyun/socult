<script lang="ts">
  // Quite not sure how the project structure works here (like the location of the files and stuff)
  import user from '../user';
  import { onMount } from 'svelte';
 
  import Login from '../lib/Login.svelte'
  // I guess the line below is some sort of reactive code which means that if '$user' changes dynamically then this statement is evaluated everytime? like `isLoggedIn` also changes huh
  $: isLoggedIn = $user === null ? false : true;

  // I guess this is used to check if user is logged in like for retaining session and stuff
  onMount(async() => {
     const userLoggedInStatus = async() => {
       const result = await fetch("http://localhost:3030/api/auth", {
         method: 'GET',
         credentials: 'include',
         headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json'
         }
       })
       return result;
     }

    const result = await userLoggedInStatus();
    const returnedData = await result.json();
    if (returnedData.success === true) {
      user.update((val: any) => val = returnedData.data);
    }
  });
</script>

<h2>Welcome to [Site Name]</h2>
<Login /> 
<a href="/register" type="button">Register</a>
<!-- {#if isLoggedIn}
  <h1>You are now logged in: {$user.firstName}</h1>
  <input type="button" value="Logout!" on:click={logout}/>
{:else}
  <h2>Welcome to [Site Name]</h2>
  <Login /> 
  <a href="/register" type="button">Register</a>
{/if} -->

