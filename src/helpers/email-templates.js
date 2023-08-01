const templateEmailRegister = (customer, user) =>
  `<b>Hi ${customer.firstName} ${customer.lastName},</b><br/><br/>
Thanks for creating an account on Bolio Store. 
Your email access is ${user.email}.<br/> 
You can access your account area to view orders, change your password, and more at: 
<a href='https://store.bolio-ui.com/dashboard/profile/'> 
https://store.bolio-ui.com/dashboard/profile/
</a><br/><br/>We look forward to seeing you soon.`

module.exports = { templateEmailRegister }
