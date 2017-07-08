const url = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json';
$.ajax({url: url})
.done(function(res){	
	const arr = JSON.parse(res);
	const h = 700;
	const w = 1300;
	const padding = 50;
	const xScale = d3.scaleLinear()
                     .domain([d3.max(arr, (d) => d['Seconds']+10), d3.min(arr, (d) => d['Seconds'] -10)])
                     .range([w-padding *2, padding]);
	const yScale = d3.scaleLinear()
                     .domain([d3.min(arr, (d) => d['Place']-1), d3.max(arr, (d) => d['Place'])])
                     .range([h-padding, padding*3]);
	
	d3.select('div.info')
		.selectAll('ul')
		.data(arr)
		.enter()
		.append('ul')
		.attr('class', (d) => d['Place'] +'-list' + ' hidden')
		.append('li')
		.text((d) =>'Name: ' + d['Name'])
		.append('li')
		.text((d) =>'Nationality: ' + d['Nationality'])
		.append('li')
		.text((d) =>'Doping Allegations:' + d['Doping'])
		.append('li')
		.text((d) =>'Time: ' + d['Time']);
		 
	const svg = d3.select('div.chart')
				  .append('svg')
				  .attr('width', w)
				  .attr('height', h);
	
	
				  
	svg.selectAll('circle')
	.data(arr)
	.enter()
	.append('circle')
	.attr('class', '-c')
	.attr('id', (d) => d['Place'])
	.attr('fill', function(d){
		if(d['Doping'] ==''){
		return '#000000';
		}else{ 
		return '#344F63'};
	})
	.attr('r', '6')
	.attr('cx', (d) => xScale(d['Seconds']))
	.attr('cy', (d) => yScale(d['Place']));
	
	svg.selectAll('text')
	.data(arr)
	.enter()
	.append('text')
	.text((d) => d['Name'])
	.attr('class', '-c')
	.attr('id', (d) => d['Place'])
	.attr('fill', 'white')
	.attr('font-size', 14)
	.attr('x', (d) => xScale(d['Seconds']+2))
	.attr('y', (d) => yScale(d['Place'])+5);
	
	svg.
	append('circle')
	.attr('r', '6')
	.attr('fill', '#000000')
	.attr('cx', xScale(2380))
	.attr('cy', yScale(1));
	
	svg.
	append('circle')
	.attr('r', '6')
	.attr('fill', '#344F63')
	.attr('cx', xScale(2380))
	.attr('cy', yScale(3));
	
	svg
	.append('text')
	.text('No Allegations')
	.attr('fill', 'white')
	.attr('font-size', 14)
	.attr('x', xScale(2380)+7)
	.attr('y', yScale(1)+5);
	
	svg
	.append('text')
	.text('Doping Allegations')
	.attr('fill', 'white')
	.attr('font-size', 14)
	.attr('x', xScale(2380)+7)
	.attr('y', yScale(3)+5);
	
	svg
	.append('text')
	.text('35 Fastest times up Alpe d\'Huez')
	.attr('fill', 'white')
	.attr('font-size', w/30)
	.attr('x', padding)
	.attr('y', padding*1.5);
	
	const xAxis = d3.axisBottom(xScale)
	.tickFormat((x)=> {
		let min = Math.floor(x/60);
		let sec = (x%60).toFixed(0);
		if(sec == 0){
			return(min + ':' + '00');
		}else if(sec < 10){
			return(min + ':0' + sec);
		}else{
			return(min + ':' + sec);
		}
	});
    
    svg.append("g")
       .attr("transform", "translate(0," + (h - padding) + ")")
       .call(xAxis);
	 
	const yAxis = d3.axisLeft(yScale);
    
    svg.append("g")
       .attr("transform", "translate("+ (padding) +" ,0 )")
       .call(yAxis);
	$('.-c').hover(function(){
			x = this.id;
			$('.' + x +'-list').removeClass('hidden');
			$('.info').removeClass('hidden');
	}, function(){
			$('.' + x +'-list').addClass('hidden');
			$('.info').addClass('hidden');
	});
});