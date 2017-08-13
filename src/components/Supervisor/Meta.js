import React, { PureComponent } from 'react'
import { PropTypes } from 'prop-types'
import { Row, Col, Icon, Popover, Card } from 'antd'
import { ResponsiveContainer, Tooltip, AreaChart, Area, XAxis } from 'recharts'

class Meta extends PureComponent {
  constructor(props) {
    super(props)
  }

  renderTooltip(data) {
    if (!data.payload || !data.payload[0]) return null
    const { name, counts } = data.payload[0].payload
    const { all, types } = counts

    return (
      // Show only if not empty
      <div className="chart-tooltip">
        <h4>
          {name} õa kokku {all}
        </h4>
        {Object.keys(types).map(key => {
          const t = types[key]
          return (
            <p key={key}>
              {key}: {t}
            </p>
          )
        })}
      </div>
    )
  }

  renderPopover(types) {
    return (
      <div>
        {Object.keys(types).map(key => {
          return (
            <p key={key}>
              {key}: {types[key]}
            </p>
          )
        })}
      </div>
    )
  }

  render() {
    const { data, count } = this.props
    const registeredTypes = count.registered.types
    const defendedTypes = count.defended.types
    const { profile } = data

    const name = profile.firstName + ' ' + profile.lastName

    return (
      <div className="supervisors-meta">
        <Row className="meta-row" gutter={24} type="flex">
          <Col sm={13} md={12} className="profile">
            <img
              className="profile-image"
              src={
                'http://via.placeholder.com/150/b1e3da/ffffff/?text=' +
                profile.firstName[0] +
                ' ' +
                profile.lastName[0]
              }
            />
            <div className="details">
              <h1>
                {name}
              </h1>
              <h3>Tarkvaratehnika õpetaja</h3>
              <h3>Tallinna Ülikool | A-431</h3>
              <div className="contact">
                {/*TODO concat if too long <email></email>*/}
                E-mail: romil.robtsenkov@romil.ee
                <br />
                Phone: 6555524 <br />
                Links: <a href="github.com">Github</a>,{' '}
                <a href="github.com">ETIS</a>
              </div>
            </div>
          </Col>

          <Col
            xs={24}
            sm={{ span: 10, offset: 1 }}
            md={{ span: 11, offset: 1 }}
            className="topics-description"
          >
            <h4>Topics</h4>
            <div>
              Tallinna Ülikooli vilistlane, kes on lõpetanud nii Informaatika
              eriala bakalaureuse tasemel kui ka läbinud magistriõppe. Õppejõuna
              üritab ta pidevalt ennast täiendada ning kasutada uusi
              tehnoloogiaid, rõhudes alati praktilise lõppväljundi
            </div>
          </Col>
        </Row>

        <div className="chart-area">
          <Card className="supervising-card">
            <span className="card-title">
              Supervising <br /> today
            </span>

            <span className="count">
              <Popover
                content={this.renderPopover(registeredTypes)}
                placement="right"
              >
                {count.registered.all}
                <Icon className="info-icon" type="info-circle-o" />
              </Popover>
            </span>
            <br />
          </Card>

          <Card className="defendedCard">
            <ResponsiveContainer height={103}>
              <AreaChart
                data={count.defended.chartData}
                margin={{ top: 5, right: 5, bottom: 5, left: 120 }}
              >
                <defs>
                  <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="05%"
                      stopColor="rgb(107,202,186)"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="rgb(107,202,186)"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <Tooltip
                  content={this.renderTooltip}
                  cursor={false}
                  active={true}
                />
                <Area
                  type="monotone"
                  dataKey="counts.all"
                  stroke="rgb(107,202,186)"
                  fillOpacity={1}
                  fill="url(#colorPv)"
                />
                <XAxis
                  dataKey="name"
                  tickSize={8}
                  tickLine={false}
                  axisLine={false}
                  tick={{ color: '#6BCABA' }}
                />
              </AreaChart>
            </ResponsiveContainer>

            <div className="supervised-card">
              <span className="card-title">
                Total <br />supervised
              </span>
              <span className="count">
                <Popover
                  content={this.renderPopover(defendedTypes)}
                  placement="right"
                >
                  {count.defended.all}
                  <Icon className="info-icon" type="info-circle-o" />
                </Popover>
              </span>
            </div>
          </Card>
        </div>
      </div>
    )
  }
}

Meta.propTypes = {
  data: PropTypes.object.isRequired,
  count: PropTypes.object.isRequired
}

export default Meta
