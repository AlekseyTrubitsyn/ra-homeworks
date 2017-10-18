function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function compareNumbers(a, b) {
  return a - b;
}

class App extends React.Component {
	componentWillMount() {
		this.setState({
			data: [],
			series: ['France', 'Italy', 'England', 'Sweden', 'Germany'],
			labels: ['cats', 'dogs', 'horses', 'ducks', 'cows'],
			colors: ['#43A19E', '#7B43A1', '#F2317A', '#FF9824', '#58CF6C']
		})
	}

	componentDidMount() {
		this.populateArray();
		setInterval(this.populateArray.bind(this), 2000);
	}

	populateArray() {
		const	series = 5;
		const serieLength = 5;

    let data = new Array(series).fill(new Array(serieLength).fill(0));
    data = data.map(serie => serie.map(item => getRandomInt(0, 20)));

		this.setState({ data });
	}

	render() {
		const { data, colors, labels, series } = this.state;
		const max = data.reduce((max, serie) => Math.max(max, serie.reduce((serieMax, item) => Math.max(serieMax, item), 0)), 0);

    let attrs = Object.assign({}, this.state, { max: max });
		return (
			<section>
        <ColumnCharts {...attrs} />
        <StackedCharts {...attrs} />
        <LayeredCharts {...attrs} />
        <HorisontalCharts {...attrs} />

        <div className="Legend">
    			{ labels.map((label, labelIndex) => {
    				return (
    				<div>
    					<span className="Legend--color" style={{ backgroundColor: colors[labelIndex % colors.length]  }} />
    					<span className="Legend--label">{ label }</span>
    				</div>
    				);
    			}) }
    		</div>
			</section>
		);
	}
}

const ColumnCharts = (props) => {
  const { data, colors, labels, series, max } = props;

  return (
    <Charts series={ data }>
      { series => series.map((serie, serieIndex) =>
        <ChartSerie
          key={ serieIndex }
          serieIndex={ serieIndex }
          serie={ serie }
          labels={ labels }>
          { items => items.map((item, itemIndex) =>
            <ChartItem
              key={ itemIndex }
              color={ colors[ itemIndex ] }
              value={ item }
              max={ max }>
              { item }
            </ChartItem>
          )}
        </ChartSerie>
      )}
    </Charts>
  )
}

const StackedCharts = (props) => {
  const { data, colors, labels, series, max } = props;

  return (
    <Charts series={ data }>
      { series => series.map((serie, serieIndex) =>
        <ChartSerie
          key={ serieIndex }
          serieIndex={ serieIndex }
          serie={ serie }
          labels={ labels }
          stacked>
          { (items, sum) => items.map((item, itemIndex) =>
            <ChartItem
              key={ itemIndex }
              color={ colors[ itemIndex ] }
              value={ item }
              sum={ sum }
              stacked>
              { item }
            </ChartItem>
          )}
        </ChartSerie>
      )}
    </Charts>
  )
}

const LayeredCharts = (props) => {
  const { data, colors, labels, series, max } = props;

  return (
    <Charts series={ data }>
      { series => series.map((serie, serieIndex) =>
        <ChartSerie
          key={ serieIndex }
          serieIndex={ serieIndex }
          serie={ serie }
          labels={ labels }
          layered>
          { (items, sum, length, sortedSerie) => items.map((item, itemIndex) =>
            <ChartItem
              key={ itemIndex }
              color={ colors[ itemIndex ] }
              value={ item }
              max={ max }
              serieLength={ length }
              itemIndexOfSorted={ sortedSerie.indexOf(item) }
              sortedSerie={ sortedSerie }
              layered>
              { item }
            </ChartItem>
          )}
        </ChartSerie>
      )}
    </Charts>
  )
}

const HorisontalCharts = (props) => {
  const { data, colors, labels, series, max } = props;

  return (
    <Charts series={ data } horizontal>
      { series => series.map((serie, serieIndex) =>
        <ChartSerie
          key={ serieIndex }
          serieIndex={ serieIndex }
          serie={ serie }
          labels={ labels }
          horizontal>
          { items => items.map((item, itemIndex) =>
            <ChartItem
              key={ itemIndex }
              color={ colors[ itemIndex ] }
              value={ item }
              max={ max }
              horizontal>
              { item }
            </ChartItem>
          )}
        </ChartSerie>
      )}
    </Charts>
  )
}

const Charts = (props) => {
  const { children, series, horizontal } = props;
  let className = "Charts" + ((horizontal) ? " horizontal" : "");

  return(
    <div className={ className }>
      { children(series) }
    </div>
  )
}

const ChartSerie = (props) => {
  const { children, serieIndex, serie, labels, stacked, layered, horizontal } = props;
  let className = 'Charts--serie'
  let styles = { height: 250 };

  let sum = 0;
  let sortedSerie;

  if (stacked) {
    sum = serie.reduce((carry, current) => carry + current, 0);
    className += ' stacked';

  } else if (layered) {
    sortedSerie = serie.slice(0).sort(compareNumbers);
    className += ' layered';

  } else if (horizontal) {
    styles.height = 'auto';
  }

  return (
    <div className={ className } style={ styles }>
      <label>{ labels[serieIndex] }</label>
      { children(serie, sum, serie.length, sortedSerie) }
    </div>
  )
}

const ChartItem = (props) => {
  const { children, color, value, max, sum, stacked, layered, horizontal, serieLength, itemIndexOfSorted, sortedSerie } = props;

  let className = 'Charts--item';
  let size = value / max * 100;
  let opacity = value / max + .05;
  let height;
  let width;
  let right;

  if (stacked) {
    className += ' stacked';
    size = value / sum * 100;
    opacity = 1;

  } else if (layered) {
    className += ' layered';
    right = (itemIndexOfSorted / (serieLength + 1) * 100) + '%';

  }

  if (horizontal) {
    width = size + '%';

  } else {
    height = size + '%';
  }

  let style = {
    backgroundColor: color,
    opacity: opacity,
    zIndex: value,
    height: height,
    width: width,
    right: right
  };

  return (
    <div
      className={ className }
      style={ style }
    >
      <b style={{ color: color }}>{ children }</b>
    </div>
  );
}
