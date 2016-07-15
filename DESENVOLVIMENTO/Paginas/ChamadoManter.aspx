<%@ Page Title="" Language="C#" MasterPageFile="~/Master/Site.Master" AutoEventWireup="true"
    CodeBehind="ChamadoManter.aspx.cs" Inherits="Sistema.ProjetoTeste.UI.Paginas.ChamadoManter" %>

<asp:Content ID="HeadContent" ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>
<asp:Content ID="MainContent" ContentPlaceHolderID="MainContent" runat="server">
    <asp:UpdatePanel ID="updPesquisar" runat="server" UpdateMode="Conditional">
        <ContentTemplate>
            <div id="divPesquisar" runat="server">
                <ul class="breadcrumb pull-down">
                    <li>Você está em: Projeto Teste<span class="divider">/</span></li>
                    <li>Pesquisa<span class="divider">/</span></li>
                    <li class="active">
                        <label id="lblPesquisar" runat="server">
                            Pesquisar Chamado</label>
                    </li>
                </ul>
                <h2>
                    Pesquisar Chamado</h2>
                <div class="row">
                    <div class="span12">
                        <asp:UpdateProgress ID="uppPesquisar" runat="server" AssociatedUpdatePanelID="updPesquisar">
                            <ProgressTemplate>
                                <div class="block">
                                    <div class="loader">
                                        <p>
                                            Carregando informações...
                                        </p>
                                        <img runat="server" id="imgPesquisa" src="~/Recursos/01/img/img-loader.gif" alt="Carregando..." />
                                    </div>
                                </div>
                            </ProgressTemplate>
                        </asp:UpdateProgress>
                        <fieldset>
                            <legend>Período</legend>
                            <div class="row">
                                <div class="span">
                                    <div class="control-group left-label">
                                        <label>
                                            Inicial</label>
                                        <div class="controls">
                                            <asp:TextBox ID="txtDataInicialPesquisa" runat="server" SkinID="DataTextBox" ToolTip="Data inicial" />
                                            <asp:RegularExpressionValidator ID="revDataInicialPesquisa" runat="server" ErrorMessage="Data inicial inválida!"
                                                Display="None" SetFocusOnError="true" ControlToValidate="txtDataInicialPesquisa"
                                                ValidationExpression="^(((0?[1-9]|[12]\d|3[01])[\.\-\/](0?[13578]|1[02])[\.\-\/]((1[6-9]|[2-9]\d)?\d{2}|\d))|((0?[1-9]|[12]\d|30)[\.\-\/](0?[13456789]|1[012])[\.\-\/]((1[6-9]|[2-9]\d)?\d{2}|\d))|((0?[1-9]|1\d|2[0-8])[\.\-\/]0?2[\.\-\/]((1[6-9]|[2-9]\d)?\d{2}|\d))|(29[\.\-\/]0?2[\.\-\/]((1[6-9]|[2-9]\d)?(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00)|00|[048])))$">
                                            </asp:RegularExpressionValidator>
                                        </div>
                                    </div>
                                </div>
                                <div class="span">
                                    <div class="control-group left-label">
                                        <label>
                                            Final</label>
                                        <div class="controls">
                                            <asp:TextBox ID="txtDataFinalPesquisa" runat="server" SkinID="DataTextBox" ToolTip="Data final" />
                                            <asp:RegularExpressionValidator ID="revDataFinalPesquisa" runat="server" ErrorMessage="Data final inválida!"
                                                Display="None" SetFocusOnError="true" ControlToValidate="txtDataFinalPesquisa"
                                                ValidationExpression="^(((0?[1-9]|[12]\d|3[01])[\.\-\/](0?[13578]|1[02])[\.\-\/]((1[6-9]|[2-9]\d)?\d{2}|\d))|((0?[1-9]|[12]\d|30)[\.\-\/](0?[13456789]|1[012])[\.\-\/]((1[6-9]|[2-9]\d)?\d{2}|\d))|((0?[1-9]|1\d|2[0-8])[\.\-\/]0?2[\.\-\/]((1[6-9]|[2-9]\d)?\d{2}|\d))|(29[\.\-\/]0?2[\.\-\/]((1[6-9]|[2-9]\d)?(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00)|00|[048])))$">
                                            </asp:RegularExpressionValidator>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                        <div class="form-actions">
                            <asp:Button ID="btnPesquisar" runat="server" Text="Pesquisar" CssClass="btn btn-primary"
                                ToolTip="Pesquisar" OnClick="btnPesquisar_Click" />
                            <asp:Button ID="btnNovo" runat="server" Text="Novo" CssClass="btn right-plus" ToolTip="Novo"
                                OnClick="btnNovo_Click" />Para incluir um novo chamado selecione a opção "Novo".
                        </div>
                        <div id="divGridPesquisa" runat="server" visible="false">
                            <h2>
                                Parâmetro de Pesquisa</h2>
                            <asp:GridView ID="grvGridPesquisa" runat="server" SkinID="ListGridView" OnRowCommand="grvGridPesquisa_RowCommand">
                                <Columns>
                                    <asp:TemplateField HeaderText="Estado">
                                        <ItemTemplate>
                                            <%# Eval("_TipoEstadoFormatado")%>
                                        </ItemTemplate>
                                    </asp:TemplateField>
                                    <asp:TemplateField HeaderText="Tipo de Chamado">
                                        <ItemTemplate>
                                            <%# Eval("_TipoChamadoFormatado")%>
                                        </ItemTemplate>
                                    </asp:TemplateField>
                                    <asp:TemplateField HeaderText="Motivo do Chamado">
                                        <ItemTemplate>
                                            <%# Eval("_TipoMotivoChamadoFormatado")%>
                                        </ItemTemplate>
                                    </asp:TemplateField>
                                    <asp:TemplateField HeaderText="Data do Atendimento">
                                        <ItemTemplate>
                                            <%# Eval("DataInicial")+" - "+Eval("DataFinal")%>
                                        </ItemTemplate>
                                    </asp:TemplateField>
                                    <asp:TemplateField HeaderText="" HeaderStyle-HorizontalAlign="Center" ItemStyle-Width="50"
                                        ItemStyle-CssClass="last4 espaco-table-ie7">
                                        <ItemTemplate>
                                            <asp:LinkButton ID="lkbEditar" runat="server" CommandName="Editar" CommandArgument='<%# Eval("Id") %>'
                                                CausesValidation="false" CssClass="icon-pencil" ToolTip="Editar" />
                                            <asp:LinkButton ID="lkbVisualizar" runat="server" CommandName="Visualizar" CommandArgument='<%# Eval("Id") %>'
                                                CausesValidation="false" CssClass="icon-folder-open" ToolTip="Visualizar" />
                                            <asp:LinkButton ID="lkbExcluir" runat="server" CommandName="Excluir" CommandArgument='<%# Eval("Id") %>'
                                                CausesValidation="false" CssClass="icon-trash" ToolTip="Excluir" OnClientClick="return confirm('Deseja realmente excluir?')" />
                                        </ItemTemplate>
                                    </asp:TemplateField>
                                </Columns>
                            </asp:GridView>
                        </div>
                    </div>
                </div>
            </div>
        </ContentTemplate>
        <Triggers>
            <asp:AsyncPostBackTrigger ControlID="btnSalvar" />
            <asp:AsyncPostBackTrigger ControlID="btnVoltar" />
            <asp:AsyncPostBackTrigger ControlID="grvGridPesquisa" />
        </Triggers>
    </asp:UpdatePanel>
    <asp:UpdatePanel ID="updCadastrar" runat="server" UpdateMode="Always">
        <ContentTemplate>
            <div id="divCadastrar" runat="server" visible="false">
                <ul class="breadcrumb pull-down">
                    <li>Você está em: Projeto Teste<span class="divider">/</span></li>
                    <li>Cadastro<span class="divider">/</span></li>
                    <li class="active">
                        <label id="lblCadastrar" runat="server">
                            Cadastrar Projeto Teste</label><label id="lblEditar" runat="server">Editar Projeto Teste</label>
                        <label id="lblVisualizar" runat="server">
                            Visualizar Projeto Teste</label>
                    </li>
                </ul>
                <h2 id="h2Cadastrar" runat="server" visible="true">
                    Cadastrar Projeto Teste</h2>
                <h2 id="h2Editar" runat="server" visible="false">
                    Editar Projeto Teste</h2>
                <h2 id="h2Visualizar" runat="server" visible="false">
                    Visualizar Projeto Teste</h2>
                <p>
                    Os campos com (*) são de preenchimento obrigatório.
                </p>
                <div class="row">
                    <div class="span12">
                        <asp:UpdateProgress ID="uppCadastrar" runat="server" AssociatedUpdatePanelID="updCadastrar">
                            <ProgressTemplate>
                                <div class="block">
                                    <div class="loader">
                                        <p>
                                            Carregando informações...
                                        </p>
                                        <img runat="server" id="imgCadastrar" src="~/Recursos/01/img/img-loader.gif" alt="Carregando..." />
                                    </div>
                                </div>
                            </ProgressTemplate>
                        </asp:UpdateProgress>
                        <fieldset>
                            <legend>Dados do Projeto Teste</legend>
                            <div class="row">
                                <div class="span4">
                                    <div class="control-group left-label">
                                        <label>
                                            * Estado</label>
                                        <div class="controls">
                                            <asp:DropDownList ID="ddlEstadoCadastro" runat="server" CssClass="input-large" ToolTip="Estado">
                                                <asp:ListItem Selected="True" Text="Selecione" Value="-1" />
                                                <asp:ListItem Text="AC-ACRE" Value="1" />
                                                <asp:ListItem Text="AL-ALAGOAS" Value="2" />
                                                <asp:ListItem Text="AP-AMAPÁ" Value="3" />
                                                <asp:ListItem Text="AM-AMAZONIA" Value="4" />
                                                <asp:ListItem Text="BA-BAHIA" Value="5" />
                                                <asp:ListItem Text="CE-CEARÁ" Value="6" />
                                                <asp:ListItem Text="DF-DISTRITO FEDERAL" Value="7" />
                                                <asp:ListItem Text="ES-ESPIRITO SANTO" Value="8" />
                                                <asp:ListItem Text="GO-GOIÁS" Value="9" />
                                                <asp:ListItem Text="MA-MARANHÃO" Value="10" />
                                                <asp:ListItem Text="MT-MATO GROSSO" Value="11" />
                                                <asp:ListItem Text="MS-MATO GROSSO DO SUL" Value="12" />
                                                <asp:ListItem Text="MG-MINAS GERAIS" Value="13" />
                                                <asp:ListItem Text="PA-PARÁ" Value="14" />
                                                <asp:ListItem Text="PB-PARAÍBA" Value="15" />
                                                <asp:ListItem Text="PR-PARANÁ" Value="16" />
                                                <asp:ListItem Text="PE-PERNAMBUCO" Value="17" />
                                                <asp:ListItem Text="PI-PIAUÍ" Value="18" />
                                                <asp:ListItem Text="RJ-RIO DE JANEIRO" Value="19" />
                                                <asp:ListItem Text="RN-RIO GRANDE DO NORTE" Value="20" />
                                                <asp:ListItem Text="RS-RIO GRANDE DO SUL" Value="21" />
                                                <asp:ListItem Text="RO-RONDÔNIA" Value="22" />
                                                <asp:ListItem Text="RR-RORAIMA" Value="23" />
                                                <asp:ListItem Text="SC-SANTA CATARINA" Value="24" />
                                                <asp:ListItem Text="SP-SÃO PAULO" Value="25" />
                                                <asp:ListItem Text="SE-SERGIPE" Value="26" />
                                                <asp:ListItem Text="TO-TOCANTINS" Value="27" />
                                            </asp:DropDownList>
                                            <asp:RequiredFieldValidator ID="rfvTipoEstado" runat="server" ErrorMessage="Informe o estado!"
                                                Display="None" SetFocusOnError="true" InitialValue="-1" ControlToValidate="ddlEstadoCadastro" />
                                        </div>
                                    </div>
                                </div>
                                <div class="span4">
                                    <div class="control-group">
                                        <label>
                                            * Tipo de Chamado</label>
                                        <div class="controls">
                                            <asp:DropDownList ID="ddlTipoChamadoCadastro" runat="server" ToolTip="Tipo de chamado"
                                                CssClass="input-large">
                                                <asp:ListItem Selected="True" Text="Selecione" Value="-1" />
                                                <asp:ListItem Text="TELEFONE" Value="1" />
                                                <asp:ListItem Text="CHAT" Value="2" />
                                                <asp:ListItem Text="EMAIL" Value="3" />
                                            </asp:DropDownList>
                                            <asp:RequiredFieldValidator ID="rfvTipoChamado" runat="server" ErrorMessage="Informe o nome!"
                                                Display="None" SetFocusOnError="true" ControlToValidate="ddlTipoChamadoCadastro" />
                                        </div>
                                    </div>
                                </div>
                                <div class="span4">
                                    <div class="control-group">
                                        <label>
                                            * Motivo do Chamado</label>
                                        <div class="controls">
                                            <asp:DropDownList ID="ddlTipoMotivoChamadoCadastro" runat="server" CssClass="input-large"
                                                ToolTip="Motivo do chamado">
                                                <asp:ListItem Selected="True" Text="Selecione" Value="-1" />
                                                <asp:ListItem Text="DÚVIDAS" Value="1" />
                                                <asp:ListItem Text="ELOGIOS" Value="2" />
                                                <asp:ListItem Text="SUGESTÕES" Value="3" />
                                            </asp:DropDownList>
                                            <asp:RequiredFieldValidator ID="rfvMotivoChamado" runat="server" ErrorMessage="Informe o e-mail!"
                                                Display="None" SetFocusOnError="true" InitialValue="-1" ControlToValidate="ddlTipoMotivoChamadoCadastro" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="span6">
                                    <div class="control-group left-label">
                                        <label>
                                            * Registro</label>
                                        <div class="controls">
                                            <asp:TextBox ID="txtRegistroCadastro" runat="server" CssClass="textarea-large uppercase" ToolTip="Registro"
                                                TextMode="MultiLine" tamanho="500" Mode="MaxLength" />
                                            <asp:RequiredFieldValidator ID="rfvRegistro" runat="server" ErrorMessage="Informe o registro!"
                                                Display="None" SetFocusOnError="true" ControlToValidate="txtRegistroCadastro" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                        <div class="form-actions">
                            <asp:Button ID="btnSalvar" runat="server" Text="Salvar" CssClass="btn btn-primary"
                                ToolTip="Salvar" OnClick="btnSalvar_Click" />
                            <asp:Button ID="btnVoltar" runat="server" Text="Voltar" CssClass="btn" ToolTip="Voltar"
                                OnClick="btnVoltar_Click" CausesValidation="false" />
                        </div>
                    </div>
                </div>
            </div>
        </ContentTemplate>
        <Triggers>
            <asp:AsyncPostBackTrigger ControlID="btnPesquisar" />
            <asp:AsyncPostBackTrigger ControlID="btnNovo" />
            <asp:AsyncPostBackTrigger ControlID="grvGridPesquisa" />
        </Triggers>
    </asp:UpdatePanel>
</asp:Content>
