using System.Linq;
using Alfa.Core.Rule;
using Alfa.Core.Container;
using Alfa.Core.Repository;
using Sistema.ProjetoTeste.Entidade;

namespace Sistema.ProjetoTeste.Regras
{
    public class UsuarioSistemaRegra : DefaultPersistenceRule<UsuarioSistema>
    {
        public UsuarioSistemaRegra() : base(new UsuarioSistema()) { }

        public override void OnSave(UsuarioSistema entity)
        {
            base.OnSave(entity);

            var verificarLoginExistente = Locator.GetComponent<IRepository<UsuarioSistema>>().GetAll().Any(item => item.Login == entity.Login || item.Nome == entity.Nome && item.Id != entity.Id);
            Validator.Assert(!verificarLoginExistente,"Usuário já cadastrado no sistema!");

            Validator.Validate();
        }
    }
}
