using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Alfa.Core.Repository;
using Sistema.ProjetoTeste.Entidade;
using Alfa.Core.Container;
using Microsoft.Reporting.WebForms;

namespace Sistema.ProjetoTeste.UI.Relatorios
{
    public partial class RelatorioListaChamadosManter : PageBaseLocal
    {
        #region "Propriedades"

        private IRepository<Chamado> repChamado
        {
            get { return Locator.GetComponent<IRepository<Chamado>>(); }
        }

        #endregion

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
                IniciarPagina();
        }

        private void IniciarPagina()
        {
            IQueryable<Chamado> query = repChamado.GetAll();

            var dataSource = from item in query.ToList()
                             select new
                             {
                                 Registro = item.Registro,
                                 DataAtendimento = item.DataInicial.Value.ToString("dd/MM/yyyy"),
                                 TipoEstado = item._TipoEstadoFormatado,
                                 TipoChamado = item._TipoChamadoFormatado,
                                 TipoMotivoChamado = item._TipoMotivoChamadoFormatado
                             };

            if (dataSource.Count() == 0)
            {
                Alerta("Não existe chamados para esta solicitação!");
                return;
            }
            else
            {
                ReportDataSource = dataSource;
                ReportParameters.Add(new ReportParameter("UsuarioLogado", UsuarioLocalLogado.Nome));
                Response.Redirect("RelatorioPadrao.aspx?Report=RelatorioListaChamadoManter.rdlc&Format=PDF");
            }

        }
    }
}