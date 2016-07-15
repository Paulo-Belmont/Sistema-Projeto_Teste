using System;
using Saude.Core.Web;
using Saude.Net.Util;
using System.Collections.Generic;
using Microsoft.Reporting.WebForms;
using Sistema.ProjetoTeste.Entidade;
using Sistema.ProjetoTeste.Enumerados;

namespace Sistema.ProjetoTeste.UI
{
    public class PageBaseLocal : PageBaseAut
    {
        public EnumPerfil? PerfilUsuarioLogado
        {
            get
            {
                if (Session["_PerfilUsuarioLogado"] == null) return null;
                return (EnumPerfil)Session["_PerfilUsuarioLogado"];
            }

            set
            {
                Session["_PerfilUsuarioLogado"] = value;
            }
        }

        public String PaginaLogin
        {
            get
            {
                if (Session["_PaginaLogin"] == null) return null;
                return Session["_PaginaLogin"].ToString();
            }

            set
            {
                Session["_PaginaLogin"] = value;
            }
        }

        public UsuarioSistema UsuarioLocalLogado
        {
            get
            {
                if (Session["_UsuarioLocalLogado"] == null) return null;
                return (UsuarioSistema)Session["_UsuarioLocalLogado"];
            }
            set
            {
                Session["_UsuarioLocalLogado"] = value;
            }
        }

        public new bool IsUsuarioAutenticado
        {
            get
            {
                if (Session["_IsUsuarioAutenticado"] == null) Session["_IsUsuarioAutenticado"] = false;
                return Session["_IsUsuarioAutenticado"].ToBool().GetValueOrDefault();
            }
            set
            {
                Session["_IsUsuarioAutenticado"] = value;
            }
        }

        protected override void OnInitComplete(EventArgs e)
        {
            if (!IsUsuarioAutenticado)
                if (!PaginaLogin.IsNullOrEmptyOrSpace())
                    Response.Redirect(PaginaLogin);
                else
                    Response.Redirect("~/Login.aspx");
        }

        public new List<ReportParameter> ReportParameters
        {
            get
            {
                if (Session["_ReportParameter"] == null) Session["_ReportParameter"] = new List<ReportParameter>();
                return (List<ReportParameter>)Session["_ReportParameter"];
            }
            set
            {
                Session["_ReportParameter"] = value;
            }
        }
    }

}