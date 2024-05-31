Account.Login: 登入頁面
Account.Logout: 登出頁面
Account.Register: 註冊頁面
Account.RegisterConfirmation: 註冊確認頁面
Account.Manage: 使用者管理頁面（例如更改密碼、管理外部登入、雙因素驗證等）
Account.ForgotPassword: 忘記密碼頁面
Account.ResetPassword: 重置密碼頁面
Account.ConfirmEmail: 電子郵件確認頁面
Account.ConfirmEmailChange: 電子郵件更改確認頁面
Account.AccessDenied: 拒絕訪問頁面

dotnet aspnet-codegenerator identity -dc MyApp.Data.ApplicationDbContext --files "Account.Logout;Account.RegisterConfirmation;Account.Manage;Account.ForgotPassword;Account.ResetPassword;Account.ConfirmEmail;Account.ConfirmEmailChange;Account.AccessDenied"

dotnet aspnet-codegenerator identity -dc MyApp.Data.ApplicationDbContext --files "Account.Login"
dotnet aspnet-codegenerator identity -dc MyApp.Data.ApplicationDbContext --files "Account.Logout"
dotnet aspnet-codegenerator identity -dc MyApp.Data.ApplicationDbContext --files "Account.Register"
dotnet aspnet-codegenerator identity -dc MyApp.Data.ApplicationDbContext --files "Account.RegisterConfirmation"
dotnet aspnet-codegenerator identity -dc MyApp.Data.ApplicationDbContext --files "Account.ForgotPassword"
dotnet aspnet-codegenerator identity -dc MyApp.Data.ApplicationDbContext --files "Account.ResetPassword"
dotnet aspnet-codegenerator identity -dc MyApp.Data.ApplicationDbContext --files "Account.ConfirmEmail"
dotnet aspnet-codegenerator identity -dc MyApp.Data.ApplicationDbContext --files "Account.ConfirmEmailChange"
dotnet aspnet-codegenerator identity -dc MyApp.Data.ApplicationDbContext --files "Account.AccessDenied"
