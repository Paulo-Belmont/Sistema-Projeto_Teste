using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Microsoft.Reporting.WebForms;

namespace Sistema.ProjetoTeste.UI.Relatorios
{
    public partial class RelatorioPadrao : PageBaseLocal
    {
        #region "Propriedades"

        protected override bool RequerAutenticacao
        {
            get
            {
                return false;
            }
        }

        #endregion

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
                ConfigurarRelatorio();
        }

        #region "Metodos"

        private void ConfigurarRelatorio()
        {
            RelatorioReportViewer.LocalReport.ReportPath = Server.MapPath(Request.QueryString["Report"]);
            string formato = Request.QueryString["Format"];
            if (ReportParameters.Count > 0)
            {
                RelatorioReportViewer.LocalReport.SetParameters(ReportParameters);
            }
            RelatorioReportViewer.LocalReport.DataSources.Clear();
            ReportDataSource DataSourceGrid = new ReportDataSource("DataSourceGrid", ReportDataSource);
            RelatorioReportViewer.LocalReport.DataSources.Add(DataSourceGrid);
            RelatorioReportViewer.DataBind();

            ReportParameters.Clear();

            string sReportFormatType = GetFormato(formato);
            string sMimeType = null;
            string sEncoding = null;
            string sExtension = null;
            string sSizeinfo = null;
            Microsoft.Reporting.WebForms.Warning[] warnings;
            string[] sStreams = null;
            Response.ContentType = sMimeType;

            byte[] Buffer = RelatorioReportViewer.LocalReport.Render(GetFormato(formato), sSizeinfo, out sMimeType, out sEncoding, out sExtension, out sStreams, out warnings);
            HttpContext.Current.Response.Clear();
            HttpContext.Current.Response.Buffer = true;
            HttpContext.Current.Response.ContentType = sMimeType;

            if (sReportFormatType == GetFormato(formato))
                HttpContext.Current.Response.AppendHeader("Content-Disposition", "attachment; filename=relatorio." + sReportFormatType);

            HttpContext.Current.Response.BinaryWrite(Buffer);
            HttpContext.Current.Response.Flush();
        }

        private string GetFormato(string formato)
        {
            if (formato == "PDF")
                return "PDF";

            if (formato == "Word")
                return "Word";

            return "Excel";
        }

        #endregion
    }
}
