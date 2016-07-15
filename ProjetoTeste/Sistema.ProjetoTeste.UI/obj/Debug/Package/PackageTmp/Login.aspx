<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="Sistema.ProjetoTeste.UI.Login" %>

<!DOCTYPE html>
<html lang="pt-br">
<head id="Head1" runat="server">
    <title>Projeto Teste</title>
    <link rel="Shortcut Icon" href="../Recursos/01/img/Brasao.ico" />
    <link href="~/Recursos/01/css/bootstrap.css" type="text/css" rel="Stylesheet" />
    <link href="~/Recursos/01/css/bootstrap.min.css" type="text/css" rel="Stylesheet" />
    <link href="~/Recursos/01/css/login.css" type="text/css" rel="Stylesheet" />
    <link href="~/Recursos/01/css/main.css" type="text/css" rel="Stylesheet" />
    <link href="~/Recursos/01/css/customizacao.css" type="text/css" rel="Stylesheet" />
    <style type="text/css">
        fieldset
        {
            background-color: #f5f5f5;
            background-image: -moz-linear-gradient(top, #f5f5f5, #f5f5f5);
            background-image: -ms-linear-gradient(top, #f5f5f5, #f5f5f5);
            background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#f5f5f5), to(#f5f5f5));
            background-image: -webkit-linear-gradient(top, #f5f5f5, #f5f5f5);
            background-image: -o-linear-gradient(top, #f5f5f5, #f5f5f5);
            background-image: linear-gradient(top, #f5f5f5, #f5f5f5);
        }
        
        legend
        {
            background: none;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
    <div class="container">
        <div class="navbar navbar-fixed-top">
            <div class="navbar-inner">
                <div class="container">
                    <span class="brand">Sistema Projeto de Teste</span>
                </div>
            </div>
        </div>
    </div>
    <div class="global">
        <div class="container">
            <div class="row">
                <div class="span12 top-plus bottom-plus">
                    <div class="row">
                        <div class="span9 top-plus bottom-plus">                           
                        </div>
                        <div id="divLogar" runat="server" class="span3">
                            <div class="well">
                                <p>
                                    <h5>
                                        Login de Acesso
                                    </h5>
                                </p>
                                <asp:ValidationSummary ID="valErrorSummary" runat="server" DisplayMode="List" CssClass="alert-danger alert valErrorSummary"
                                    HeaderText='<h4 class="alert-heading masterPage">Atenção!</h4>' />
                                <div class="row">
                                    <div class="span3">
                                        <div class="control-group">
                                            <label>
                                                * Login</label>
                                            <div class="input-prepend">
                                                <span class="add-on"><i class="icon-user"></i></span>
                                                <asp:TextBox ID="txtLogin" runat="server" CssClass="input-medium" placeholder="Login"
                                                    MaxLength="40" />
                                                <asp:RequiredFieldValidator ID="rfvLogin" runat="server" ErrorMessage="Informe o login!"
                                                    Display="None" SetFocusOnError="true" ControlToValidate="txtLogin" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="span3">
                                        <div class="control-group">
                                            <label>
                                                * Senha
                                            </label>
                                            <div class="input-prepend">
                                                <span class="add-on"><i class="icon-lock"></i></span>
                                                <asp:TextBox ID="txtSenha" runat="server" TextMode="Password" MaxLength="10" CssClass="input-medium"
                                                    placeholder="Senha" />
                                                <asp:RequiredFieldValidator ID="rfvSenha" runat="server" ErrorMessage="Informe a senha!"
                                                    Display="None" SetFocusOnError="true" ControlToValidate="txtSenha" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <br />
                                <p>
                                    <asp:Button ID="btnLogar" runat="server" Text="Entrar" CssClass="btn btn-primary"
                                        OnClick="btnLogar_Click" />
                                </p>
                                <%-- <p>
                                    <asp:LinkButton ID="lkbSolicitarSenha" runat="server" Text="Não consegue acessar sua conta?"
                                        CausesValidation="false" OnClick="lkbSolicitarSenha_Click" />
                                </p>--%>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <footer>
            <div class="container footer">        
                <p>Copyright ©2016. Todos os direitos reservados.</p>
            </div>
        </footer>
    </form>
</body>
</html>
