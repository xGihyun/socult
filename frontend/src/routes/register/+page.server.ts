/* @type {import('./$types').Actions} */

export const actions = {
  default: async (event: any) => {
    const data = await event.request.formData()
    console.log(data)
    
    // TODO log the user in
    //throw redirect(307, '/login');
  }
};