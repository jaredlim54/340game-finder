import React from 'react';

export function ClearCardsButton(props) {
  function handleRefresh(event) {
    props.isRendered();
  }
  return (
    <section>
      <div className="refresh-button">
          <button type="button" className="btn btn-yellow" onClick={handleRefresh}>Clear Recommendations</button>
      </div>
    </section>
  );
}

export function InputPanel(props) {
  let listOptions = props.gameData.map(function(item) {
    let name = item.name;
    return <option key={item.appid} value={name}></option>
  })

  const handleSubmit = (event) => {
    event.preventDefault();
    props.handleSubmit();
  }

  const handleChange1 = (event) => {
    props.handleChange1(event);
  }

  const handleChange2 = (event) => {
    props.handleChange2(event);
  }

  const handleChange3 = (event) => {
    props.handleChange3(event);
  }

  const handleReset = (event) => {
    props.handleReset(event);
  }

  return (
    <section>
    <div className="recommendation-container">
      <h2 className="recommendation-title">
        Video Game Recommendations
      </h2>
      <h3 className="recommendation-subtitle">
        Choose up to three games you enjoyed:
      </h3>
      <hr />
      <form className="form form-inline">
        <div className="form-group col-xs-12 col-sm-12 col-lg-12 col-xl-4">
          <label htmlFor="game1" className="col-xs-4">Game 1</label>
          <div className="col-xs-8">
            <input type="text" 
                    className="form-control details" 
                    onChange={handleChange1} 
                    value={props.inputValue1} 
                    id="game1" 
                    placeholder="Enter a game:"
                    disabled={props.inputDisabled}
                    list="options1" 
                    aria-label="input field 1"/>
            <div className="validity-field">{props.inputValidity1}</div>
            <datalist id="options1">
              {listOptions}
            </datalist>
          </div>
        </div>
        <div className="form-group col-xs-12 col-sm-12 col-lg-12 col-xl-4">
          <label htmlFor="game2" className="col-xs-4">Game 2</label>
          <div className="col-xs-8">
            <input type="text" 
                    className="form-control details" 
                    onChange={handleChange2} 
                    value={props.inputValue2} 
                    id="game2" 
                    placeholder="Enter a game:"
                    disabled={props.inputDisabled}
                    list="options2" 
                    aria-label="input field 2"/>
            <div className="validity-field">{props.inputValidity2}</div>
            <datalist id="options2">
              {listOptions}
            </datalist>
          </div>
        </div>
        <div className="form-group col-xs-12 col-sm-12 col-lg-12 col-xl-4">
          <label htmlFor="game3" className="col-xs-4">Game 3</label>
          <div className="col-xs-8">
            <input type="text" 
                    className="form-control details" 
                    onChange={handleChange3} 
                    value={props.inputValue3} 
                    id="game3" 
                    placeholder="Enter a game:"
                    disabled={props.inputDisabled} 
                    list="options3" 
                    aria-label="input field 3"/>
            <div className="validity-field">{props.inputValidity3}</div>
            <datalist id="options3">
              {listOptions}
            </datalist>
          </div>
        </div>
        <div className="buttons">
          <button type="submit" onClick={handleSubmit} className="btn btn-yellow">Submit</button>
          <button type="reset" onClick={handleReset} className="btn btn-yellow">Reset</button>
        </div>
      </form>
    </div>
  </section>
  );
}