using System;
using System.Linq;
using Saude.Net.Util;
using Alfa.Core.Mapper;
using Alfa.Core.Container;
using Alfa.Core.Repository;
using Sistema.ProjetoTeste.Entidade;

namespace Sistema.ProjetoTeste.UI
{
    public partial class Login : PageBaseLocal
    {
        #region "Propriedades"

        private IRepository<UsuarioSistema> repUsuarioSistema
        {
            get
            {
                return Locator.GetComponent<IRepository<UsuarioSistema>>();
            }
        }

        #endregion

        #region "Eventos"

        protected override void OnInitComplete(EventArgs e)
        {

        }

        protected void Page_Load(object sender, EventArgs e)
        {
            PaginaLogin = "~/Login.aspx";

            if (!IsPostBack)
                IniciarPagina();
        }

        protected void btnLogar_Click(object sender, EventArgs e)
        {
            if (txtLogin.Text.IsNullOrEmptyOrSpace() && txtSenha.Text.IsNullOrEmptyOrSpace())
            {
                Alerta("Informe o login e senha!");
                txtLogin.Focus();
                return;
            }

            if (txtLogin.Text.IsNullOrEmptyOrSpace())
            {
                Alerta("Informe o login!");
                txtLogin.Focus();
                return;
            }

            if (txtSenha.Text.IsNullOrEmptyOrSpace())
            {
                Alerta("Informe a senha!");
                txtSenha.Focus();
                return;
            }           

            var usuarioLogado = repUsuarioSistema.GetAll().SingleOrDefault(item => item.Login == txtLogin.Text && item.Senha == txtSenha.Text);

            if (usuarioLogado != null)
            {
                IsUsuarioAutenticado = true;
                UsuarioLocalLogado = usuarioLogado;
                PerfilUsuarioLogado = usuarioLogado.Perfil;
                Response.Redirect("~/Default.aspx");
            }
            else
            {
                Alerta("Login ou senha inválidos!");
                txtLogin.Focus();
                LimparPagina();
                return;
            }
        }      

        protected void lkbSolicitarSenha_Click(object sender, EventArgs e)
        {
            Response.Redirect("~/NovaSenha.aspx");
        }

        #endregion

        #region "Metodos"

        private void IniciarPagina()
        {
            txtLogin.Focus();
            Form.DefaultButton = btnLogar.UniqueID;
            ConfigurationBuilder.Create();
            //ConfigurationBuilder.Drop();
        }

        private void LimparPagina()
        {
            txtLogin.Text =
            txtSenha.Text = string.Empty;
        }     

        #endregion
    }
}