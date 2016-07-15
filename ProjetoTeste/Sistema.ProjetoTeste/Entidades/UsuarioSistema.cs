using System;
using Saude.Net.Util;
using Alfa.Core.Entity;
using Alfa.Core.Mapper.Property;
using System.Collections.Generic;
using Sistema.ProjetoTeste.Enumerados;

namespace Sistema.ProjetoTeste.Entidade
{
    [Serializable]
    public class UsuarioSistema : EntityBase
    {
        #region "Construtor"

        public UsuarioSistema()
        {
            Chamados = new List<Chamado>();
        }

        #endregion

        #region "Propriedades"

        public virtual int Id { get; private set; }

        public virtual int Version { get; set; }
        [StringLength(100)]
        public virtual string Nome { get; set; }
        [StringLength(40)]
        public virtual string Login { get; set; }
        [StringLength(32)]
        public virtual string Senha { get; set; }

        public virtual DateTime? DataCriacao { get; set; }

        public virtual EnumPerfil? Perfil { get; set; }

        public virtual IList<Chamado> Chamados { get; set; }

        public virtual void AddChamado(Chamado pChamado)
        {
            Chamados.Add(pChamado);
            pChamado.UsuarioSistema = this;
        }

        public virtual void RemoveChamado(Chamado pChamado)
        {
            Chamados.Remove(pChamado);
        }

        #endregion

        #region "Validade"

        public override IEnumerable<string> Validate()
        {
            if (this.Nome.IsNullOrEmptyOrSpace()) yield return "Informe o nome!";
            if (this.Login.IsNullOrEmptyOrSpace()) yield return "Informe o login!";
            if (this.Senha.IsNullOrEmptyOrSpace()) yield return "Informe a senha!";
            if (!this.DataCriacao.HasValue) yield return "Informe a data de criação!";
            if (this.DataCriacao <= "31/12/1899".ToDateTime()) yield return "Data da criação inválida!";
        }

        #endregion
    }
}
