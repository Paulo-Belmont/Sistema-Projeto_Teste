<%@ Page Title="" Language="C#" MasterPageFile="~/Master/Site.Master" AutoEventWireup="true"
    CodeBehind="RelatorioPadrao.aspx.cs" Inherits="Sistema.ProjetoTeste.UI.Relatorios.RelatorioPadrao" %>

<asp:Content ID="HeadContent" ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>
<asp:Content ID="MainContent" ContentPlaceHolderID="MainContent" runat="server">
    <rel:ReportViewer ID="RelatorioReportViewer" runat="server" Width="100%" Height="450px"
        ShowPrintButton="false" Visible="false" Font-Names="Verdana" Font-Size="8pt">
        <LocalReport ReportPath="" EnableExternalImages="true">
        </LocalReport>
    </rel:ReportViewer>
</asp:Content>
