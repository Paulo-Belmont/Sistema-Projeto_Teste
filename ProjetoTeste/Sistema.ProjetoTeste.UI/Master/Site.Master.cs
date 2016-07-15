using System;
using System.Web;
using System.Linq;
using Alfa.Core.Container;
using Alfa.Core.Repository;
using System.Web.UI.HtmlControls;
using System.Collections.Generic;
using Sistema.ProjetoTeste.Entidade;
using Sistema.ProjetoTeste.Enumerados;

namespace Sistema.ProjetoTeste.UI.Master
{
    public partial class Site : System.Web.UI.MasterPage
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

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                TratarPermissaoPagina();
                ValidarPerfilUsuarioLogado();
            }
        }

        protected void lknSair_Click(object sender, EventArgs e)
        {
            PageBaseLocal page = this.Page as PageBaseLocal;

            if (page != null)
            {
                Session["_IsUsuarioAutenticado"] = null;
                Session["_IsUsuarioAutenticado"] = false;
                Response.Redirect(page.PaginaLogin);
            }
        }

        #endregion

        #region "Metodos"

        private void TratarPermissaoPagina()
        {
            PageBaseLocal paginaLocal = this.Page as PageBaseLocal;

            if (paginaLocal != null)
            {
                if (paginaLocal.IsUsuarioAutenticado)
                {
                    List<HtmlAnchor> itens = new List<HtmlAnchor>();

                    itens.Add(ancChamado);                    
                    itens.Add(ancListarChamado);
                    DesabilitarCache();

                    var paginaSolicitadaVerficada = paginaLocal.Page.AppRelativeVirtualPath;

                    var paginaLinkSoliictado = itens.SingleOrDefault(item => item.HRef.ToUpper() == paginaSolicitadaVerficada.ToUpper());

                    if (paginaLinkSoliictado != null && paginaLinkSoliictado.Visible == false)
                        paginaLocal.AlertaRedirecionar("Você não tem permissão para acessar esta página!", "Login.aspx");
                }
            }
        }

        private void ValidarPerfilUsuarioLogado()
        {
            PageBaseLocal pagina = this.Page as PageBaseLocal;

            if (pagina != null && pagina.IsUsuarioAutenticado)
            {
                var query = repUsuarioSistema.GetAll().Any(item => item.Id == pagina.UsuarioLocalLogado.Id);

                if (query)
                {
                    lblUsuarioLabel.Text = pagina.UsuarioLocalLogado.Nome;

                    if (pagina.PerfilUsuarioLogado == EnumPerfil.SUPERVIDOR)
                        HabilitarControles(true, true);

                    if (pagina.PerfilUsuarioLogado == EnumPerfil.ATENDENTE)
                        HabilitarControles(false, true);
                }
            }
            else
                pagina.AlertRedirect("Você não tem permissão para acessar esta página!", "../Login.aspx");
        }

        private void HabilitarControles(bool pHabilitar, bool pDesabilitar)
        {            
            ancListarChamado.Visible = pHabilitar;
            ancChamado.Visible = pDesabilitar;
        }

        public string Usuario
        {
            get { return lblUsuarioLabel.Text; }
            set { lblUsuarioLabel.Text = value; }
        }       

        public void DesabilitarCache()
        {
            HttpContext.Current.Response.Cache.SetExpires(DateTime.UtcNow.AddDays(-1));
            HttpContext.Current.Response.Cache.SetValidUntilExpires(false);
            HttpContext.Current.Response.Cache.SetRevalidation(HttpCacheRevalidation.AllCaches);
            HttpContext.Current.Response.Cache.SetCacheability(HttpCacheability.NoCache);
            HttpContext.Current.Response.Cache.SetNoStore();
        }

        #endregion
    }
}