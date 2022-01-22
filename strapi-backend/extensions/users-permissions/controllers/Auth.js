module.export = {
    async callback(ctx) {
        console.log("this is called");
        const { email, password } = ctx.request.body;
        const user = await strapi.plugins['users-permissions'].services.user.fetch({
            email,
        });
    }
}