'use client'; // This is a client component

import Chart from 'chart.js';
import { useEffect, useState } from 'react';

export default function CardBarChart() {
	const [allProducts, setAllProducts] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch('/api/products/all-products');
				const data = await response.json();
				setAllProducts(data);
			} catch (error) {
				console.error('Error fetching products:', error);
			}
		};

		fetchData();
	}, []);

	useEffect(() => {
		if (allProducts.length > 0) {
			const labels = allProducts.map((product) => product.name);
			const data = allProducts.map((product) => product.quantity);

			let config = {
				type: 'bar',
				data: {
					labels,
					datasets: [
						{
							label: 'Quantity',
							backgroundColor: '#4a5568',
							borderColor: '#4a5568',
							data,
							fill: false,
							barThickness: 20,
						},
					],
				},
				options: {
					maintainAspectRatio: false,
					responsive: true,
					title: {
						display: false,
						text: 'Product Quantity',
					},
					tooltips: {
						mode: 'index',
						intersect: false,
					},
					hover: {
						mode: 'nearest',
						intersect: true,
					},
					legend: {
						labels: {
							fontColor: '#000000',
						},
						align: 'end',
						position: 'bottom',
					},
					scales: {
						xAxes: [
							{
								display: true,
								scaleLabel: {
									display: true,
									labelString: 'Products',
								},
								gridLines: {
									borderDash: [2],
									borderDashOffset: [2],
									color: '#000000',
									zeroLineColor: 'rgba(33, 37, 41, 0.3)',
									zeroLineBorderDash: [2],
									zeroLineBorderDashOffset: [2],
								},
							},
						],
						yAxes: [
							{
								display: true,
								scaleLabel: {
									display: true,
									labelString: 'Quantity',
								},
								gridLines: {
									borderDash: [2],
									drawBorder: false,
									borderDashOffset: [2],
									color: 'rgba(33, 37, 41, 0.2)',
									zeroLineColor: 'rgba(33, 37, 41, 0.15)',
									zeroLineBorderDash: [2],
									zeroLineBorderDashOffset: [2],
								},
							},
						],
					},
				},
			};

			let ctx = document.getElementById('bar-chart').getContext('2d');
			window.myBar = new Chart(ctx, config);
		}
	}, [allProducts]);

	return (
		<>
			<div className='relative mb-6 flex w-full min-w-0 flex-col break-words rounded shadow-lg'>
				<div className='mb-0 rounded-t bg-transparent px-4 py-3'>
					<div className='flex flex-wrap items-center'>
						<div className='relative w-full max-w-full flex-1 flex-grow'>
							<h6 className='text-blueGray-400 mb-1 text-xs font-semibold uppercase'> Product Quantity</h6>
							<h2 className='text-blueGray-700 text-xl font-semibold'>All Products</h2>
						</div>
					</div>
				</div>
				<div className='flex-auto p-4'>
					<div className='h-350-px relative'>
						<canvas id='bar-chart'></canvas>
					</div>
				</div>
			</div>
		</>
	);
}
