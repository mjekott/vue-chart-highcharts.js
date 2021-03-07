<template>
  <div>
    <h3 class="mb-5 subtitle has-text-centered has-text-weight-bold is-size-3">
      Dashboard
    </h3>
    <div id="display-chart"></div>
  </div>
</template>

<script>
import axios from "../api";
import Highcharts from "highcharts";
import { groupByValues, groupDataByRange } from "../helper";
export default {
  data() {
    return {
      data: [],
    };
  },
  methods: {
    fetchData() {
      axios
        .get("/sample.json")
        .then((res) => {
          const samples = [];
          for (let element of res.data) {
            samples.push(element);
          }
          this.data = samples;
          localStorage.setItem("chartdata", JSON.stringify(samples));
        })
        .catch((e) => {
          const data = JSON.parse(localStorage.getItem("chartdata"));
          if (data) {
            this.data = data;
          } else {
            alert("Please Check Your Network Connection");
            console.log(e);
          }
        });
    },
    dataSource() {
      const sortedData = [];
      const series = [];
      const categories = Object.keys(
        groupByValues("bloodGroup", this.data)
      ).sort();
      // taking data from age 20  to 80
      for (let i = 20; i < 80; i += 10) {
        let start = i,
          end = start + 9;
        sortedData.push({
          name: `${start}-${end}`,
          data: groupDataByRange(start, end, this.data),
        });
      }
      for (let element of sortedData) {
        const values = groupByValues("bloodGroup", element.data);
        const data = [];

        categories.forEach((value) => {
          values[value] ? data.push(values[value].length) : data.push(0);
        });

        series.push({
          name: element.name,
          data: data,
        });
      }
      this.setup(categories, series);
    },
    setup(categories, series) {
      Highcharts.chart("display-chart", {
        chart: {
          type: "column",
        },
        title: {
          text:
            "A Chart showing number of people with different blood groups at certian age limits ",
        },
        xAxis: {
          categories: categories,
          title: {
            text: "Ages",
          },
        },
        yAxis: {
          title: {
            text: "No of people",
          },
        },
        tooltip: {
          headerFormat:
            '<span style="font-size:10px">{point.key}</span><table>',
          pointFormat:
            '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
          footerFormat: "</table>",
          shared: true,
          useHTML: true,
        },
        plotOptions: {
          column: {
            pointPadding: 0.1,
            borderWidth: 0,
          },
        },
        series: [...series],
      });
    },
  },
  watch: {
    data: function() {
      this.dataSource();
    },
  },
  created() {
    this.fetchData();
  },
  activated() {
    this.fetchData();
  },
};
</script>
