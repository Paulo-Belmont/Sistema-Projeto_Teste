using Alfa.Core.Mapper;
using FluentNHibernate.Automapping;

namespace Sistema.ProjetoTeste.UI
{
    public class ConfigurationBuilderExt : ConfigurationBuilder
    {
        protected override void ConfigureMapping(AutoPersistenceModel autoPersistenteModel)
        {
            base.ConfigureMapping(autoPersistenteModel);          
        }
    }
}