using System;
using System.Linq;
using Saude.Net.Util;
using Alfa.Core.Container;
using Alfa.Core.Repository;
using System.Web.UI.WebControls;
using System.Collections.Generic;
using Sistema.ProjetoTeste.Entidade;

namespace Sistema.ProjetoTeste.UI.Paginas
{
    public partial class ChamadoManter : PageBaseLocal
    {
        #region "Propriedades"

        private IRepository<Chamado> repChamado
        {
            get { return Locator.GetComponent<IRepository<Chamado>>(); }
        }

        private IRepository<UsuarioSistema> repUsuarioSistema
        {
            get { return Locator.GetComponent<IRepository<UsuarioSistema>>(); }
        }

        #endregion

        #region "Sessao"

        private Chamado chamadoID
        {
            get { if (Session["_chamadoID"] == null) Session["_chamadoID"] = new Chamado(); return (Chamado)Session["_chamadoID"]; }
            set { Session["_chamadoID"] = value; }
        }

        #endregion

        #region "Eventos"

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
                IniciarPagina();
        }

        protected void btnPesquisar_Click(object sender, EventArgs e)
        {
            if (VerificarFiltroPesquisa())
            {
                divGridPesquisa.Visible = true;
                PreencherGridPesquisa(0);
            }
        }

        protected void btnNovo_Click(object sender, EventArgs e)
        {
            ControlarVisibilidade(false, true, true, false, false, true, false, false);
            HabilitarControles(true);
            Chamado query = new Chamado();
            query.DataInicial = DateTime.Now;
            repChamado.Save(query);
            PreencherPagina(query);
        }

        protected void btnVoltar_Click(object sender, EventArgs e)
        {
            ControlarVisibilidade(true, false, false, false, false, false, false, false);
            txtDataInicialPesquisa.Focus();            
            ExcluirRetornoChamado(chamadoID);
            LimparPaginaCadastro();
        }

        protected void btnSalvar_Click(object sender, EventArgs e)
        {
            Chamado query = PreencherChamado();

            if (repChamado.Save(query))
            {
                Alerta("Operação realizada com sucesso!");
                ControlarVisibilidade(true, false, false, false, false, false, false, false);
                LimparPaginaPesquisa();
                LimparPaginaCadastro();
            }
        }

        protected void grvGridPesquisa_RowCommand(object sender, GridViewCommandEventArgs e)
        {
            switch (e.CommandName)
            {
                case "Editar":
                    PreencherPagina(repChamado.GetById(e.CommandArgument.Toint().Value));
                    ControlarVisibilidade(false, true, false, true, false, false, true, false);
                    break;

                case "Visualizar":
                    PreencherPagina(repChamado.GetById(e.CommandArgument.Toint().Value));
                    ControlarVisibilidade(false, true, false, false, true, false, false, true);
                    HabilitarControles(false);
                    break;

                case "Excluir":
                    ExcluirChamado(repChamado.GetById(e.CommandArgument.Toint().Value));
                    break;
            }
        }

        protected void grvGridPesquisa_PageIndexChanging(object sender, GridViewPageEventArgs e)
        {
            PreencherGridPesquisa(e.NewPageIndex);
        }

        #endregion

        #region "Metodos"

        private void IniciarPagina()
        {
            txtDataInicialPesquisa.Focus();
            Form.DefaultButton = btnPesquisar.UniqueID;
            txtDataInicialPesquisa.Attributes.Add("maxDate", DateTime.Today.ToString("MM/dd/yyyy"));            
        }

        private Chamado PreencherChamado()
        {
            Chamado entidade = new Chamado();

            if (Id.HasValue)
                entidade = repChamado.GetById(Id.Value);

            entidade.UsuarioSistema = repUsuarioSistema.GetById(UsuarioLocalLogado.Id.Toint().Value);
            entidade.DataFinal = DateTime.Now;
            entidade.Registro = txtRegistroCadastro.Text;
            entidade.TipoEstado = ddlEstadoCadastro.SelectedValue.Toint().Value;
            entidade.TipoChamado = ddlTipoChamadoCadastro.SelectedValue.Toint().Value;
            entidade.TipoMotivoChamado = ddlTipoMotivoChamadoCadastro.SelectedValue.Toint().Value;

            return entidade;
        }

        private void PreencherPagina(Chamado pChamado)
        {
            Id = pChamado.Id;
            chamadoID = pChamado;
            txtRegistroCadastro.Text = pChamado.Registro;
            if (pChamado.TipoEstado.HasValue)
                ddlEstadoCadastro.SelectedValue = pChamado.TipoEstado.ToString();
            if (pChamado.TipoChamado.HasValue)
                ddlTipoChamadoCadastro.SelectedValue = pChamado.TipoChamado.ToString();
            if (pChamado.TipoMotivoChamado.HasValue)
                ddlTipoMotivoChamadoCadastro.SelectedValue = pChamado.TipoMotivoChamado.ToString();
        }

        private void PreencherGridPesquisa(int pPageIndex)
        {
            IQueryable<Chamado> query = repChamado.GetAll();

            if (txtDataInicialPesquisa.Text.ToDateTime().HasValue && txtDataFinalPesquisa.Text.ToDateTime().HasValue)
                query = query.Where(item => item.DataInicial >= txtDataInicialPesquisa.Text.ToDateTime() && item.DataFinal <= txtDataFinalPesquisa.Text.ToDateTime().GetValueOrDefault().AddDays(1).AddSeconds(-1));

            IList<Chamado> dataSource = query.OrderByDescending(item => item.DataInicial).ToList();
            grvGridPesquisa.DataSource = dataSource;
            grvGridPesquisa.PageIndex = pPageIndex;
            grvGridPesquisa.DataBind();
        }

        private void LimparPaginaPesquisa()
        {
            txtDataInicialPesquisa.Text =
            txtDataFinalPesquisa.Text = string.Empty;
            divGridPesquisa.Visible = false;
            grvGridPesquisa.DataSource = null;
            grvGridPesquisa.DataBind();
        }

        private void LimparPaginaCadastro()
        {
            ddlEstadoCadastro.SelectedIndex =
            ddlTipoChamadoCadastro.SelectedIndex =
            ddlTipoMotivoChamadoCadastro.SelectedIndex = -1;
            txtRegistroCadastro.Text = string.Empty;
        }

        private bool VerificarFiltroPesquisa()
        {
            if (txtDataInicialPesquisa.Text.ToDateTime() > txtDataFinalPesquisa.Text.ToDateTime())
            {
                Alerta("Data inicial não pode ser maior que a data final!");
                return false;
            }

            if (txtDataInicialPesquisa.Text.ToDateTime().HasValue && txtDataInicialPesquisa.Text.ToDateTime() <= "31/12/1899".ToDateTime())
            {
                Alerta("Data invalida!");
                return false;
            }

            return true;
        }

        private void HabilitarControles(bool pHabilitar)
        {
            ddlEstadoCadastro.Enabled =
            txtRegistroCadastro.Enabled =
            ddlTipoChamadoCadastro.Enabled =
            ddlTipoMotivoChamadoCadastro.Enabled = pHabilitar;
        }

        private void ExcluirChamado(Chamado pChamado)
        {
            if (repChamado.Delete(pChamado))
            {
                Alerta("Registro excluído com sucesso!");
                PreencherGridPesquisa(0);
            }
        }

        private void ExcluirRetornoChamado(Chamado chamadoID)
        {
            if (chamadoID.UsuarioSistema == null)
                repChamado.Delete(chamadoID);
        }

        private void ControlarVisibilidade(bool pDivPesquisa, bool pdivCadastrar, bool pLblCadastrar, bool pLblEditar, bool pLblVisualizar, bool pH2Cadastrar, bool pH2Editar, bool pH2Visualizar)
        {
            divPesquisar.Visible = pDivPesquisa;
            divCadastrar.Visible = pdivCadastrar;
            lblCadastrar.Visible = pLblCadastrar;
            lblEditar.Visible = pLblEditar;
            lblVisualizar.Visible = pLblVisualizar;
            h2Cadastrar.Visible = pH2Cadastrar;
            h2Editar.Visible = pH2Editar;
            h2Visualizar.Visible = pH2Visualizar;
        }

        #endregion
    }
}