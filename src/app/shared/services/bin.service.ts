import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, catchError } from 'rxjs';
import { Bin, BinCategory } from '../models/bin.model';

@Injectable({
  providedIn: 'root'
})
export class BinService {
  private apiUrl = 'http://localhost:8000/api/all/bins';

  constructor(private http: HttpClient) { }

  getAllBins(): Observable<Bin[]> {
    return this.http.get<Bin[]>(this.apiUrl).pipe(
      catchError(() => {
        console.warn('API call failed. Using mock data instead.');
        return of(this.getMockBins());
      })
    );
  }

  getBinById(id: string): Observable<Bin | undefined> {
    return this.http.get<Bin>(`${this.apiUrl}/${id}`).pipe(
      catchError(() => {
        console.warn('API call failed. Using mock data instead.');
        const bin = this.getMockBins().find(b => b.id === id);
        return of(bin);
      })
    );
  }

  getBinsByCategory(category: BinCategory): Observable<Bin[]> {
    return this.getAllBins().pipe(
      catchError(() => of(this.getMockBins())),
      // Filter to get only the specified category
      catchError(err => {
        console.error('Error fetching bins by category', err);
        return of([]);
      })
    );
  }

  // Mock data in case the API is not available
  private getMockBins(): Bin[] {
    return [
      {
        id: 'gen-2m3',
        name: '2 Cubic Metre General Waste Bin',
        size: '2m³',
        category: BinCategory.GENERAL,
        dimensions: {
          length: '1200mm',
          width: '1500mm',
          height: '900mm'
        },
        weight: {
          maxWeight: '300',
          weightUnit: 'kg'
        },
        suitableFor: [
          'Household cleanups',
          'Small renovations',
          'Garden waste'
        ],
        restrictions: [
          'No concrete',
          'No soil',
          'No hazardous materials'
        ],
        description: 'Our 2m³ General Waste skip bin is ideal for most household, green and building waste. A small amount of hardfill waste can be included in the bin, but please be aware of the 300kg weight restriction on the bin. OVERWEIGHT CHARGES WILL APPLY ON OVERWEIGHT BINS.',
        shortDescription: 'Ideal for household cleanups and small renovations',
        pricing: {
          price: '$210.00',
          hireLength: '4 Day Hire'
        },
        imagePath: 'assets/images/bin-2m.jpg',
        trailerLoads: 1,
        isPopular: true
      },
      {
        id: 'gen-4m3',
        name: '4 Cubic Metre General Waste Bin',
        size: '4m³',
        category: BinCategory.GENERAL,
        dimensions: {
          length: '3360mm',
          width: '1590mm',
          height: '520mm'
        },
        weight: {
          maxWeight: '600',
          weightUnit: 'kg'
        },
        suitableFor: [
          'Medium household cleanups',
          'Renovation projects',
          'Yard waste'
        ],
        restrictions: [
          'No concrete',
          'No soil',
          'No hazardous materials'
        ],
        description: 'Our 4m³ General Waste skip bin is perfect for medium-sized projects. It can hold approximately 2 standard trailer loads of waste. OVERWEIGHT CHARGES WILL APPLY ON OVERWEIGHT BINS.',
        shortDescription: 'Perfect for medium-sized renovation projects',
        pricing: {
          price: '$280.00',
          hireLength: '4 Day Hire'
        },
        imagePath: 'assets/images/bin-4m.jpg',
        trailerLoads: 2
      },
      {
        id: 'gen-6m3',
        name: '6 Cubic Metre General Waste Bin',
        size: '6m³',
        category: BinCategory.GENERAL,
        dimensions: {
          length: '3000mm',
          width: '1500mm',
          height: '1600mm'
        },
        weight: {
          maxWeight: '1000',
          weightUnit: 'kg'
        },
        suitableFor: [
          'Large household cleanups',
          'Major renovations',
          'Construction waste'
        ],
        restrictions: [
          'No concrete',
          'No soil',
          'No hazardous materials'
        ],
        description: 'Our 6m³ General Waste skip bin is designed for larger projects and can hold approximately 6 standard trailer loads of waste. Ideal for major renovations and construction waste.',
        shortDescription: 'Designed for large renovation projects',
        pricing: {
          price: '$350.00',
          hireLength: '5 Day Hire'
        },
        imagePath: 'assets/images/bin-6m.jpg',
        trailerLoads: 6
      },
      {
        id: 'hard-2m3',
        name: '2 Cubic Metre Hardfill Bin',
        size: '2m³',
        category: BinCategory.HARDFILL,
        dimensions: {
          length: '1810mm',
          width: '1350mm',
          height: '900mm'
        },
        weight: {
          maxWeight: '1000',
          weightUnit: 'kg'
        },
        suitableFor: [
          'Concrete disposal',
          'Brick disposal',
          'Soil removal'
        ],
        restrictions: [
          'No general waste',
          'No green waste',
          'No hazardous materials'
        ],
        description: 'Our 2m³ Hardfill skip bin is specifically designed for heavy materials such as concrete, bricks, soil, and stones. With a reinforced structure, it can handle weights up to 1000kg.',
        shortDescription: 'Specifically designed for concrete, bricks, and soil',
        pricing: {
          price: '$230.00',
          hireLength: '4 Day Hire'
        },
        imagePath: 'assets/images/bin-2m-hardfill.jpg',
        trailerLoads: 1
      },
      {
        id: 'green-4m3',
        name: '4 Cubic Metre Green Waste Bin',
        size: '4m³',
        category: BinCategory.GREEN,
        dimensions: {
          length: '3360mm',
          width: '1590mm',
          height: '520mm'
        },
        weight: {
          maxWeight: '500',
          weightUnit: 'kg'
        },
        suitableFor: [
          'Garden trimmings',
          'Lawn clippings',
          'Tree branches'
        ],
        restrictions: [
          'No general waste',
          'No soil',
          'No hazardous materials'
        ],
        description: "Our 4m³ Green Waste skip bin is perfect for garden cleanups and landscaping projects. It is designed to hold grass clippings, tree branches, leaves, and other garden waste.",
        shortDescription: 'Ideal for garden cleanups and landscaping projects',
        pricing: {
          price: '$260.00',
          hireLength: '5 Day Hire'
        },
        imagePath: 'assets/images/bin-4m-green.jpg',
        trailerLoads: 2,
        isPopular: true
      }
    ];
  }
}
