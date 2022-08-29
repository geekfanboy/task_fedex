import { TestBed} from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";

import { DemoApiService } from './demo-api.service';

describe('DemoApiService', () => {
  let service: DemoApiService;

  let httpTestingController: HttpTestingController;
  let x:any;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ DemoApiService ]
    })
    .compileComponents();
    
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.inject(DemoApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('be able to posts using API',  () => {
    const dummyPost={ firstName: 'Emman', lastName:'Bueta', email:'emman@real.com'}
    service.registerUser(dummyPost).subscribe();
    let req = httpTestingController.expectOne({ method: "POST", url: 'https://demo-api.vercel.app/users' });
    expect(req.request.body).toEqual(dummyPost);
  })
});
