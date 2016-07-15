using System;
using Alfa.Core.Mapper;

namespace Sistema.ProjetoTeste.UI
{
    public partial class Default : PageBaseLocal
    {
        #region "Eventos"

        protected void Page_Load(object sender, EventArgs e)
        {
            if (IsPostBack)
                IniciarPagina();
        }

        #endregion

        #region "Metodos"

        private void IniciarPagina()
        {
            
        }

        #endregion
    }
}