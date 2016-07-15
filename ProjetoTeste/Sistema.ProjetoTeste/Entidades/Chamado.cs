using System;
using Alfa.Core.Entity;
using Alfa.Core.Mapper.Property;
using System.Collections.Generic;

namespace Sistema.ProjetoTeste.Entidade
{
    [Serializable]
    public class Chamado : EntityBase
    {
        #region "Construtor"

        public Chamado()
        {

        }

        #endregion

        #region "Propriedades"

        public virtual int Id { get; private set; }

        public virtual int Version { get; set; }

        public virtual UsuarioSistema UsuarioSistema { get; set; }
        [StringLength(1000)]
        public virtual string Registro { get; set; }

        public virtual int? TipoChamado { get; set; }

        public virtual int? TipoEstado { get; set; }

        public virtual int? TipoMotivoChamado { get; set; }

        public virtual DateTime? DataInicial { get; set; }

        public virtual DateTime? DataFinal { get; set; }

        public virtual string _TipoEstadoFormatado
        {
            get
            {
                var query = "";

                if (this.TipoEstado == 1)
                    return query += "AC-ACRE";
                if (this.TipoEstado == 2)
                    return query += "AL-ALAGOAS";
                if (this.TipoEstado == 3)
                    return query += "AP-AMAPÁ";
                if (this.TipoEstado == 4)
                    return query += "AM-AMAZONIA";
                if (this.TipoEstado == 5)
                    return query += "BA-BAHIA";
                if (this.TipoEstado == 6)
                    return query += "CE-CEARÁ";
                if (this.TipoEstado == 7)
                    return query += "DF-DISTRITO FEDERAL";
                if (this.TipoEstado == 8)
                    return query += "ES-ESPIRITO SANTO";
                if (this.TipoEstado == 9)
                    return query += "GO-GOIÁS";
                if (this.TipoEstado == 10)
                    return query += "MA-MARANHÃO";
                if (this.TipoEstado == 11)
                    return query += "MT-MATO GROSSO";
                if (this.TipoEstado == 12)
                    return query += "MS-MATO GROSSO DO SUL";
                if (this.TipoEstado == 13)
                    return query += "MG-MINAS GERAIS";
                if (this.TipoEstado == 14)
                    return query += "PA-PARÁ";
                if (this.TipoEstado == 15)
                    return query += "PB-PARAÍBA";
                if (this.TipoEstado == 16)
                    return query += "PR-PARANÁ";
                if (this.TipoEstado == 17)
                    return query += "PE-PERNAMBUCO";
                if (this.TipoEstado == 18)
                    return query += "PI-PIAUÍ";
                if (this.TipoEstado == 19)
                    return query += "RJ-RIO DE JANEIRO";
                if (this.TipoEstado == 20)
                    return query += "RN-RIO GRANDE DO NORTE";
                if (this.TipoEstado == 21)
                    return query += "RS-RIO GRANDE DO SUL";
                if (this.TipoEstado == 22)
                    return query += "RO-RONDÔNIA";
                if (this.TipoEstado == 23)
                    return query += "RR-RORAIMA";
                if (this.TipoEstado == 24)
                    return query += "SC-SANTA CATARINA";
                if (this.TipoEstado == 25)
                    return query += "SP-SÃO PAULO";
                if (this.TipoEstado == 26)
                    return query += "SE-SERGIPE";
                if (this.TipoEstado == 1)
                    return query += "TO-TOCANTINS";
                return query;
            }
        }

        public virtual string _TipoChamadoFormatado
        {
            get
            {
                var query = "";

                if (this.TipoChamado == 1)
                    return query += "TELEFONE";
                if (this.TipoChamado == 2)
                    return query += "CHAT";
                if (this.TipoChamado == 3)
                    return query += "EMAIL";
                return query;
            }
        }

        public virtual string _TipoMotivoChamadoFormatado
        {
            get
            {
                var query = "";

                if (this.TipoMotivoChamado == 1)
                    return query += "DÚVIDAS";
                if (this.TipoMotivoChamado == 2)
                    return query += "ELOGIOS";
                if (this.TipoMotivoChamado == 3)
                    return query += "SUGESTÕES";
                return query;
            }
        }

        #endregion

        #region "Validade"

        public override IEnumerable<string> Validate()
        {
            if (this.Id != 0)
            {
                if (string.IsNullOrEmpty(this.Registro)) yield return "Informe a observação!";
                if (!this.TipoChamado.HasValue) yield return "Informe o tipo de chamado!";
                if (!this.TipoEstado.HasValue) yield return "Informe o tipo de estado!";
                if (!TipoMotivoChamado.HasValue) yield return "Informe o motivo do chamado!";
            }
        }

        #endregion
    }
}
