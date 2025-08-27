import "./styles.css";

export default function Page() {
  // const onClickAddExperience = (e: MouseEvent<HTMLButtonElement, MouseEvent>) => {
  //   console.log('Im clicked');
  // }

  return (
    <form>
      <div className="input-form">
        <label>Nome do plano de estudos:</label>
        <input type="text" name="name" />
      </div>

      <div className="input-form">
        <label>Qual tecnologia você pretende estudar?</label>
        <input type="text" name="studyGoal" />
      </div>

      <div className="input-form">
        {/* 
          TODO: Aqui mudar para que seja possível adicionar várias tecnologias
          e para cada uma delas, necessário informar:
            - a tecnologia em si. Ex: React
            - tempo de experiência. Ex: dois inputs, um númeor para quantidade e outro para anos ou meses
        */}
        <label>Quais tecnologias você possui experiência?</label>
        <div className="input-form-aggregator">
          <input type="text" name="studyGoal" />
        </div>
        {/* <button onClick={onClickAddExperience}>Adicionar experiência</button> */}
        <button className="btn-add-xp">Adicionar experiência</button>
      </div>

      <div className="input-form">
        <label>
          Qual o tempo total você deseja investir neste plano de estudos?
        </label>
        <div className="input-form-inline-field">
          <input type="number" name="studyGoal" min={1} />
          <input type="text" name="studyGoal" />
        </div>
      </div>

      <div className="input-form">
        {/* TODO: Exemplo: 1 vez por semana */}
        <label>
          Com qual frequência você pretende acessar os conteúdos que serão
          sugeridos?
        </label>
        <div>
          <input type="number" name="studyGoal" min={1} />
          <span> vez(es) por </span>
          {/* TODO: Mudar para um select field */}
          <input type="text" name="studyGoal" />
        </div>
      </div>

      <div className="input-form">
        <label>Quais tipos de conteúdo você prefere para estudar?</label>
        <div>
          <input type="checkbox" name="audio" />
          <label> Áudio</label>
        </div>
        <div>
          <input type="checkbox" name="text" />
          <label> Texto</label>
        </div>
        <div>
          <input type="checkbox" name="doc" />
          <label> Documentações</label>
        </div>
        <div>
          <input type="checkbox" name="video" />
          <label> Vídeos</label>
        </div>
      </div>

      <div className="input-form">
        <label></label>
        <div>
          <input type="radio" name="accessibleContent" id="free" />
          <label> Gratuito</label>
        </div>
        <div>
          <input type="radio" name="accessibleContent" id="paid" />
          <label> Pago</label>
        </div>
        <div>
          <input type="radio" name="accessibleContent" id="both" />
          <label> Ambos</label>
        </div>
      </div>
      <button className="btn-create-roadmap" type="submit">Create Road Map</button>
    </form>
  );
}
