import React, { useEffect, useState } from 'react'
import DataEditor, { GridCellKind } from "@glideapps/glide-data-grid";
import api from "../../api";
import { getStyle } from '@coreui/utils';
import { CCard, CCardBody, CRow, CCol } from '@coreui/react-pro';
import { CChartLine, CChartBar, CChart } from '@coreui/react-chartjs';
import { random } from 'lodash';

import CIcon from '@coreui/icons-react'
import {
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilPeople,
  cilUser,
  cilUserFemale,
  cilArrowBottom,
  cilCart,
  cilArrowTop,
  cilUserPlus,
  cilOptions,
} from '@coreui/icons'
import {
  CAvatar,
  CButton,
  CCardSubtitle,
  CCardTitle,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CProgress,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CWidgetStatsA,
} from '@coreui/react-pro'

import avatar1 from '../../../public/assets/images/avatars/1.jpg'
import avatar2 from '../../assets/images/avatars/2.jpg'
import avatar3 from '../../assets/images/avatars/3.jpg'
import avatar4 from '../../assets/images/avatars/4.jpg'
import avatar5 from '../../assets/images/avatars/5.jpg'
import avatar6 from '../../assets/images/avatars/6.jpg'




const COLORS = [
  "#ea5545", "#f46a9b", "#ef9b20", "#edbf33", "#ede15b", "#bdcf32", "#87bc45", "#27aeef", "#b33dc6"
];

function color(index) {
  return COLORS[index % COLORS.length];
}


const CHART_COLORS = {
  red: 'rgb(255, 99, 132)',
  orange: 'rgb(255, 159, 64)',
  yellow: 'rgb(255, 205, 86)',
  green: 'rgb(75, 192, 192)',
  blue: 'rgb(54, 162, 235)',
  purple: 'rgb(153, 102, 255)',
  grey: 'rgb(201, 203, 207)'
};

const groupBy = function (xs, key) {
  return xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

const NAMED_COLORS = [
  CHART_COLORS.blue,
  CHART_COLORS.purple,
  CHART_COLORS.grey,
  CHART_COLORS.red,
  CHART_COLORS.orange,
  CHART_COLORS.yellow,
  CHART_COLORS.green,
];

function namedColor(index) {
  return NAMED_COLORS[index % NAMED_COLORS.length];
}
function formatCompactNumber(number) {
  const formatter = Intl.NumberFormat("en", { notation: "compact" });
  return formatter.format(number);
}

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null)
  const fetchDashboardData = async (reportType,isTransparent = false) => {
    let { data, status, statusText } = await api.get(`/api/dashboard?report_type=${encodeURI(reportType)}&period=2023`)
    if (status === 200) {
      let response = (data.message);
      if (data.status === true) {
        let values = data.payload.data;
        let p = {};
        p.value = values.total;
        p.labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        p.datasets = [];
        let dataByCategory = groupBy(values.data, 'category');
        let i = 0;
        for (let category in dataByCategory) {
          p.datasets.push({
            label: category,
            backgroundColor: isTransparent ?'transparent': color(i),
            cubicInterpolationMode: 'monotone',
            tension: 0.4,
            pointStyle: 'circle',
            pointRadius: 5,
            pointHoverRadius: 7,
            borderColor: color(i),
            borderWidth: 1,
            borderRadius: 0.1,
            borderSkipped: true,
            data: dataByCategory[category].map((x) => x.amount)
          });
          i++;
        }
        return p;
      }
    } else {
      let response = (data.message);
    }
    return [];
  }
  useEffect(() => {
    startupFunc();
  }, []);
  useEffect(() => {
  }, [dashboardData]);

  const startupFunc = async () => {
    let p = dashboardData;
    if (dashboardData === null) p = {};
    p["Sales_Annual"] = await fetchDashboardData("Sales_Annual",true);
    p["Purchases_Annual"] = await fetchDashboardData("Purchases_Annual");
    p["Patients_Annual"] = await fetchDashboardData("Patients_Annual",true);
    await setDashboardData(p);
  }


  const tableExample = [
    {
      avatar: { src: avatar1, status: 'success' },
      user: {
        name: 'Dr. Perera',
        registered: 'physiology',
      },
      count: {
        value: 48,
        color: 'success',
      },
      usage: {
        value: 15,
        color: 'success',
      },
    },
    {
      avatar: { src: avatar2, status: 'danger' },
      user: {
        name: 'Dr. Kumar',
        new: false,
        registered: 'Nephrologists',
      },
      count: {
        value: 22,
        color: 'info',
      },
      usage: {
        value: 23,
        color: 'success',
      },
    },
    {
      avatar: { src: avatar3, status: 'warning' },
      user: { name: 'Dr. Swarna', new: true, registered: 'physiology' },
      count: {
        value: 15,
        color: 'warning',
      },
      usage: {
        value: 25,

        color: 'success',
      },
    },
    {
      avatar: { src: avatar4, status: 'secondary' },
      user: { name: 'Dr. Dinesh', new: true, registered: 'Cardiologist' },
      
      count: {
        value: 8,
        color: 'danger',
      },
      usage: {
        value: 14,
        color: 'success',
      },
    },
    {
      avatar: { src: avatar5, status: 'success' },
      user: {
        name: 'Dr. Kamal',
        new: true,
        registered: 'Cardiologist',
      },
      
      count: {
        value: 3,
        color: 'primary',
      },
      usage: {
        value: 12,
        color: 'success',
      },
    },
    {
      avatar: { src: avatar6, status: 'danger' },
      user: {
        name: 'Other Doctors',
        registered: '',
      },
      count: {
        value: 4,
        color: 'success',
      },
      usage: {
        value: 11,
        color: 'success',
      },
    },
  ]


  return (
    <>
      <CCard className="p-0">
        <CCardBody>
          <h2>Dashboard</h2>
        </CCardBody>
      </CCard>
      {dashboardData !== null && <div>
{/* new modified start */}
<CRow >
        <CCol xl={4} >
          <CRow>
            <CCol lg={12}>
              <CCard className="mb-5">
                <CCardBody className="p-5">
                  <CRow>
                    <CCol>
                      <CCardTitle className="fs-4 fw-semibold">Sale</CCardTitle>
                      <CCardSubtitle className="fw-normal text-disabled">
                        January - September 2023
                      </CCardSubtitle>
                    </CCol>
                    <CCol className="text-end text-primary fs-4 fw-semibold">Rs. 450 M</CCol>
                  </CRow>
                </CCardBody>
                <CChartLine
                  className="mt-4"
                  style={{ height: '150px' }}
                  data={{
                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September'],
                    datasets: [
                      {
                        label: 'Seles Report',
                        backgroundColor: `rgba(${getStyle('--cui-primary-rgb')}, .1)`,
                        borderColor: getStyle('--cui-primary'),
                        borderWidth: 3,
                        data: [78, 81, 80, 45, 34, 22, 40,73,60],
                        fill: true,
                      },
                    ],
                  }}
                  options={{
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                    maintainAspectRatio: false,
                    scales: {
                      x: {
                        display: false,
                      },
                      y: {
                        beginAtZero: true,
                        display: false,
                      },
                    },
                    elements: {
                      line: {
                        borderWidth: 2,
                        tension: 0.4,
                      },
                      point: {
                        radius: 0,
                        hitRadius: 10,
                        hoverRadius: 4,
                      },
                    },
                  }}
                />
              </CCard>
            </CCol>
            <CCol lg={6}>
              <CCard className="mb-6 ">
                <CCardBody>
                  <div className="d-flex justify-content-between">
                    <CCardTitle className="text-disabled">Patient Count</CCardTitle>
                    <div className="bg-primary bg-opacity-25 text-primary p-5 rounded">
                      <CIcon icon={cilPeople} size="xl" />
                    </div>
                  </div>
                  <div className="fs-4 fw-semibold pb-3">148 K</div>
                  <small className="text-danger">
                    (-1.4% <CIcon icon={cilArrowBottom} />)
                  </small>
                </CCardBody>
              </CCard>
            </CCol>
            <CCol lg={6}>
              <CCard className="mb-4">
                <CCardBody>
                  <div className="d-flex justify-content-between">
                    <CCardTitle className="text-disabled">Purchases</CCardTitle>
                    <div className="bg-primary bg-opacity-25 text-primary p-5 rounded">
                      <CIcon icon={cilCart} size="xl" />
                    </div>
                  </div>
                  <div className="fs-4 fw-semibold pb-3">Rs. 198 M</div>
                  <small className="text-success">
                    (5.3% <CIcon icon={cilArrowTop} />)
                  </small>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CCol>
        <CCol xl={8}>
          <CCard className="mb-4">
            <CCardBody className="p-4">
              <CCardTitle className="fs-4 fw-semibold">Seles Report</CCardTitle>
              <CCardSubtitle className="fw-normal text-disabled">
                January 01, 2023 - September 19, 2023
              </CCardSubtitle>
              <CChartBar
                data={{
                  labels: [
                    'Jan',
                    'Feb',
                    'Mar',
                    'Apr',
                    'May',
                    'Jun',
                    'Jul',
                    'Aug',
                    'Sep',
                  ],
                  datasets: [
                    {
                      label: 'Clinical',
                      backgroundColor: getStyle('--cui-primary'),
                      borderRadius: 6,
                      borderSkipped: false,
                      data: [78, 90, 60, 45, 34, 12, 40, 85, 65],
                      barPercentage: 0.6,
                      categoryPercentage: 0.5,
                    },
                    {
                      label: 'Phamacy',
                      backgroundColor: getStyle('--cui-gray-400'),
                      borderRadius: 6,
                      borderSkipped: false,
                      data: [70, 81, 80, 50, 25, 5, 45, 92, 60],
                      barPercentage: 0.6,
                      categoryPercentage: 0.5,
                    },
                    {
                      label: 'laboratory',
                      backgroundColor: getStyle('--cui-success'),
                      borderRadius: 6,
                      borderSkipped: false,
                      data: [60, 70, 90, 35, 50, 20, 30, 80, 77],
                      barPercentage: 0.6,
                      categoryPercentage: 0.5,
                    },
                    {
                      label: 'Hospital',
                      backgroundColor: getStyle('--cui-gray-100'),
                      borderRadius: 6,
                      borderSkipped: false,
                      data: [75, 85, 75, 38, 28, 10, 35, 78, 70],
                      barPercentage: 0.6,
                      categoryPercentage: 0.5,
                    },
                  ],
                }}
                options={{
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  scales: {
                    x: {
                      grid: {
                        display: false,
                        drawBorder: false,
                        drawTicks: false,
                      },
                      ticks: {
                        color: getStyle('--cui-text-disabled'),
                        font: {
                          size: 14,
                        },
                        padding: 16,
                      },
                    },
                    y: {
                      grid: {
                        drawBorder: false,
                        borderDash: [2, 4],
                      },
                      gridLines: {
                        borderDash: [8, 4],
                        color: '#348632',
                      },
                      ticks: {
                        beginAtZero: true,
                        color: getStyle('--cui-text-disabled'),
                        font: {
                          size: 14,
                        },
                        maxTicksLimit: 5,
                        padding: 16,
                        stepSize: Math.ceil(100 / 4),
                      },
                    },
                  },
                }}
                style={{ height: '300px', marginTop: '40px' }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CRow>
        <CCol xl={9} >
          <CCard className="mb-4">
            <CCardBody className="p-5">
              <CRow >
                <CCol >
                  <CCardTitle className="fs-4 fw-semibold">Consultant&apos;s Report</CCardTitle>
                  <CCardSubtitle className="fw-normal text-disabled mb-4">
                     January - September 2023
                  </CCardSubtitle>
                </CCol>
                {/* <CCol xs="auto" className="ms-auto">
                  <CButton color="secondary">
                    <CIcon icon={cilUserPlus} className="me-2" />
                    Add new user
                  </CButton>
                </CCol> */}
              </CRow>
              <CTable align="middle" className="mb-0" hover responsive>
                <CTableHead className="fw-semibold text-disabled">
                  <CTableRow>
                    {/* <CTableHeaderCell className="text-center">
                      <CIcon icon={cilPeople} />
                    </CTableHeaderCell> */}
                    <CTableHeaderCell class="w-25">Consultant</CTableHeaderCell>
                    <CTableHeaderCell class="w-50">Total</CTableHeaderCell>
                    <CTableHeaderCell class="w-25">Patient Count</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody >
                  {tableExample.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      {/* <CTableDataCell className="text-center">
                        <CAvatar size="md" src={item.avatar.src} status={item.avatar.status} />
                      </CTableDataCell> */}
                      <CTableDataCell className="p-4">
                        <div>{item.user.name}</div>
                        <div className="small text-disabled text-nowrap">
                          {/* <span>{item.user.new ? 'New' : 'Recurring'}</span>  */}
                          {' '}
                          {item.user.registered}
                        </div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="d-flex justify-content-between mb-1">
                          <div className="fw-semibold">{item.count.value}%</div>
                          <div className="small text-disabled ms-1 text-nowrap">
                            {item.count.period}
                          </div>
                        </div>
                        <CProgress
                          thin
                          color={`${item.count.color}-gradient`}
                          value={item.count.value}
                        />
                      </CTableDataCell>
                      <CTableDataCell className="p-4">
                        <div className="d-flex justify-content-between mb-1">
                          <div className="fw-semibold">{item.usage.value}%</div>
                          <div className="small text-disabled ms-1 text-nowrap">
                            {item.usage.period}
                          </div>
                        </div>
                        <CProgress
                          thin
                          color={`${item.usage.color}-gradient`}
                          value={item.usage.value}
                        />
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
        
        <CCol xl={3}>
          <CRow>
            <CCol md={4} xl={12} className="p-5">
              <CWidgetStatsA
                className="mb-4"
                color="primary"
                value={
                  <>
                    315 M{' '}
                    <span className="fs-6 fw-normal">
                      (-12.4% <CIcon icon={cilArrowBottom} />)
                    </span>
                  </>
                }
                title="Total Consultant Income"
                action={
                  <CDropdown alignment="end">
                    <CDropdownToggle color="transparent" caret={false} className="p-0">
                      <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
                    </CDropdownToggle>
                    <CDropdownMenu>
                      <CDropdownItem>Action</CDropdownItem>
                      <CDropdownItem>Another action</CDropdownItem>
                      <CDropdownItem>Something else here...</CDropdownItem>
                      <CDropdownItem disabled>Disabled action</CDropdownItem>
                    </CDropdownMenu>
                  </CDropdown>
                }
                chart={
                  <CChartLine
                    className="mt-3 mx-3"
                    style={{ height: '85px' }}
                    data={{
                      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                      datasets: [
                        {
                          label: 'Consultant Income',
                          backgroundColor: 'primary',
                          borderColor: 'rgba(255,252,255,.55)',
                          pointBackgroundColor: getStyle('--cui-primary'),
                          data: [65, 59, 84, 84, 51, 55, 40],
                        },
                      ],
                    }}
                    options={{
                      plugins: {
                        legend: {
                          display: false,
                        },
                      },
                      maintainAspectRatio: false,
                      scales: {
                        x: {
                          grid: {
                            display: false,
                            drawBorder: false,
                          },
                          ticks: {
                            display: false,
                          },
                        },
                        y: {
                          min: 30,
                          max: 89,
                          display: false,
                          grid: {
                            display: false,
                          },
                          ticks: {
                            display: false,
                          },
                        },
                      },
                      elements: {
                        line: {
                          borderWidth: 1,
                          tension: 0.4,
                        },
                        point: {
                          radius: 4,
                          hitRadius: 10,
                          hoverRadius: 4,
                        },
                      },
                    }}
                  />
                }
              />
            </CCol>
            <CCol md={4} xl={12} className="p-5">
              <CWidgetStatsA
                className="mb-4"
                color="warning"
                value={
                  <>
                    148 K{' '}
                    <span className="fs-6 fw-normal">
                      (4.1% <CIcon icon={cilArrowTop} />)
                    </span>
                  </>
                }
                title="Patient Count "
                action={
                  <CDropdown alignment="end">
                    <CDropdownToggle color="transparent" caret={false} className="p-0">
                      <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
                    </CDropdownToggle>
                    <CDropdownMenu>
                      <CDropdownItem>Action</CDropdownItem>
                      <CDropdownItem>Another action</CDropdownItem>
                      <CDropdownItem>Something else here...</CDropdownItem>
                      <CDropdownItem disabled>Disabled action</CDropdownItem>
                    </CDropdownMenu>
                  </CDropdown>
                }
                chart={
                  <CChartLine
                    className="mt-3"
                    style={{ height: '85px' }}
                    data={{
                      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                      datasets: [
                        {
                          label: 'Patient Count',
                          backgroundColor: 'rgba(255,255,255,.3)',
                          borderColor: 'rgba(255,255,255,.55)',
                          data: [78, 81, 80, 45, 34, 12, 40],
                          fill: true,
                        },
                      ],
                    }}
                    options={{
                      plugins: {
                        legend: {
                          display: false,
                        },
                      },
                      maintainAspectRatio: false,
                      scales: {
                        x: {
                          display: false,
                        },
                        y: {
                          display: false,
                        },
                      },
                      elements: {
                        line: {
                          borderWidth: 2,
                          tension: 0.4,
                        },
                        point: {
                          radius: 0,
                          hitRadius: 10,
                          hoverRadius: 4,
                        },
                      },
                    }}
                  />
                }
              />
            </CCol>
          </CRow>
        </CCol>
      </CRow>

{/* new modify codes end */}
        {/* <CRow className='mb-3'>
          <CCol sm={6}>
            <CWidgetStatsA
              className="mx-4 bg-primary bg-gradient"
              style={{ color: "white" }}
              value={
                <>
                  <div className="fw-normal">
                    Rs. {formatCompactNumber(dashboardData["Sales_Annual"] !== undefined ? dashboardData["Sales_Annual"].value : '-')}
                  </div>
                  <br />
                </>
              }
              title="Sales"
              chart={
                <CChart
                  type='line'
                  customTooltips={false}
                  className="mx-4"
                  style={{ height: 'auto' }}
                  data={{
                    labels: dashboardData["Sales_Annual"].labels,
                    datasets: dashboardData["Sales_Annual"].datasets,
                  }}
                  options={{
                    plugins: {
                      legend: {
                        labels: {
                          color: '#fff',
                        },
                        display: true,
                        position:'left',
                      }
                    },
                    scales: {
                      x: {
                        display: false,
                        grid: {
                          display: false,
                          drawBorder: false,
                          drawTicks: false,
                        },
                        ticks: {
                          display: false,
                        },
                      },
                      y: {
                        display: false,
                        grid: {
                          display: false,
                          drawBorder: false,
                          drawTicks: false,
                        },
                        ticks: {
                          display: false,
                        },
                      },
                    },
                  }}
                />
              }
            />
          </CCol>
          <CCol sm={6}>
            <CWidgetStatsA
              className="mx-4 bg-primary bg-gradient"
              style={{ color: "white"}}
              value={
                <>
                  <div className="fw-normal">
                    Rs. {formatCompactNumber(dashboardData["Purchases_Annual"] !== undefined ? dashboardData["Purchases_Annual"].value : '-')}
                  </div>
                  <br />
                </>
              }
              title="Purchases"
              chart={
                <CChartBar
                  customTooltips={false}
                  style={{ height: 'auto' }}
                  data={{
                    labels: dashboardData["Purchases_Annual"].labels,
                    datasets: dashboardData["Purchases_Annual"].datasets,
                  }}
                  labels="months"
                  options={{
                    plugins: {
                      legend: {
                        labels: {
                          color: '#fff',
                        },
                        display: true,
                        position:'left',
                      }
                    },
                    scales: {
                      x: {
                        display: false,
                        grid: {
                          display: false,
                        },
                        ticks: {
                          display: false,
                        },
                      },
                      y: {
                        display: false,
                        grid: {
                          display: false,
                        },
                        ticks: {
                          display: false,
                        },
                      },
                    },
                  }}
                />
              }
            />
          </CCol>
        </CRow>
        <CRow className='mb-3'>
          <CCol sm={12}>
            <CWidgetStatsA
              className="mx-4 bg-primary bg-gradient"
              style={{ color: "white" }}
              value={
                <>
                  <div className="fw-normal">
                    {formatCompactNumber(dashboardData["Patients_Annual"] !== undefined ? dashboardData["Patients_Annual"].value : '-')}
                  </div>
                  <br />
                </>
              }
              title="Admissions"
              chart={
                <CChart
                  customTooltips={false}
                  type='line'
                  style={{ height: 'auto' }}
                  data={{
                    labels: dashboardData["Patients_Annual"].labels,
                    datasets: dashboardData["Patients_Annual"].datasets,
                  }}
                  options={{
                    plugins: {
                      legend: {
                        labels: {
                          color: '#fff',
                        },
                        display: true,
                        position:'left',
                      }
                    },
                    scales: {
                      x: {
                        display: false,
                        grid: {
                          display: false,
                        },
                        ticks: {
                          display: false,
                        },
                      },
                      y: {
                        display: false,
                        grid: {
                          display: false,
                        },
                        ticks: {
                          display: false,
                        },
                      },
                    },
                  }}
                />
              }
            />
          </CCol>
        </CRow> */}
        {/* <CRow className='mb-3'>
          <CCol sm={6}>
            <CWidgetStatsA
              className="mx-4"
              color="primary"
              value={
                <>
                  <div className="fw-normal">
                    10K
                  </div>
                  <br />
                </>
              }
              title="Admissions"
              chart={
                <CChart
                  customTooltips={false}
                  type='line'
                  data={{
                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                    datasets: [
                      {
                        label: '',
                        backgroundColor: 'transparent',
                        borderColor: 'rgba(255,255,255,.55)',
                        pointBackgroundColor: 'rgba(0,0,255,.55)',
                        data: [78, 81, 80, 45, 34, 12, 40],
                      },
                    ],
                  }}
                  options={{
                    plugins: {
                      legend: {
                        display: false,
                      }
                    },
                    scales: {
                      x: {
                        display: false,
                        grid: {
                          display: false,
                        },
                        ticks: {
                          display: false,
                        },
                      },
                      y: {
                        display: false,
                        grid: {
                          display: false,
                        },
                        ticks: {
                          display: false,
                        },
                      },
                    },
                  }}
                />
              }
            />
          </CCol>
          <CCol sm={6}>
            <CWidgetStatsA
              className="mx-4"
              color="success"
              value={
                <>
                  <div className="fw-normal">
                    20K
                  </div>
                  <br />
                </>
              }
              title="Total OPD Patients"
              chart={
                <CChart
                  customTooltips={false}
                  type='line'
                  style={{ height: 'auto' }}
                  data={{
                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                    datasets: [
                      {
                        label: '',
                        backgroundColor: 'transparent',
                        borderColor: 'rgba(255,255,255,.55)',
                        pointBackgroundColor: 'rgba(0,0,255,.55)',
                        data: [78, 81, 80, 45, 34, 12, 40],
                      },
                    ],
                  }}
                  options={{
                    plugins: {
                      legend: {
                        display: false,
                      }
                    },
                    scales: {
                      x: {
                        display: false,
                        grid: {
                          display: false,
                        },
                        ticks: {
                          display: false,
                        },
                      },
                      y: {
                        display: false,
                        grid: {
                          display: false,
                        },
                        ticks: {
                          display: false,
                        },
                      },
                    },
                  }}
                />
              }
            />
          </CCol>
            </CRow>*/}
      </div>}

    </>
  )
}

export default Dashboard
