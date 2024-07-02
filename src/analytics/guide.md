Revenue
Get Revenue for a Specific Company:

GET http://localhost:3000/analytics/revenue/:period/:companyId
Period values: last-week, last-month, last-3-months, last-6-months, last-year

Sold Listings
Get Sold Listings for a Specific Company:

GET http://localhost:3000/analytics/sold-listings/:period/:companyId
Period values: last-week, last-month, last-3-months, last-6-months, last-year

Specific Car Make
Get Specific Car Make Sold Count:

GET http://localhost:3000/analytics/car-make-sold/:period/:make
Period values: last-week, last-month, last-3-months, last-6-months, last-year

Specific Car Model
Get Specific Car Model Sold Count:

GET http://localhost:3000/analytics/car-model-sold/:period/:model
Period values: last-week, last-month, last-3-months, last-6-months, last-year

New Listings
Get New Listings Count:

GET http://localhost:3000/analytics/new-listings/:period
Period values: last-week, last-month, last-3-months, last-6-months, last-year

Top Earning Companies
Get Top Earning Companies:

GET http://localhost:3000/analytics/top-earning-companies/:period
Period values: last-week, last-month, last-3-months, last-6-months, last-year

New Listings
Get New Listings for a Period:

GET http://localhost:3000/analytics/new-listings/:period
Period values: last-week, last-month, last-3-months, last-6-months, last-year

Car Makes and Models Based on New Listings
Get Car Makes Based on New Listings for a Period:

GET http://localhost:3000/analytics/new-listings/car-makes/:period
Period values: last-week, last-month, last-3-months, last-6-months, last-year

Get Car Models Based on New Listings for a Period:

GET http://localhost:3000/analytics/new-listings/car-models/:period
Period values: last-week, last-month, last-3-months, last-6-months, last-year
