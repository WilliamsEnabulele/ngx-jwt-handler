import { TestBed } from '@angular/core/testing';

import { SessionHandlerService } from './session-handler.service';

describe('SessionHandlerService', () => {
  let service: SessionHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add data to the session', () => {
    service.add('testKey', { data: 'testValue' });
    expect(sessionStorage.getItem('testKey')).toEqual(JSON.stringify({ data: 'testValue' }));
  });

  it('should remove data from the session', () => {
    sessionStorage.setItem('testKey', JSON.stringify({ data: 'testValue' }));
    service.remove('testKey');
    expect(sessionStorage.getItem('testKey')).toBeNull();
  });

  it('should get data from the session', () => {
    sessionStorage.setItem('testKey', JSON.stringify({ data: 'testValue' }));
    expect(service.get('testKey')).toEqual({ data: 'testValue' });
  });

  it('should return null if data does not exist in the session', () => {
    expect(service.get('nonExistentKey')).toBeNull();
  });

  it('should check if a key exists in the session', () => {
    sessionStorage.setItem('existingKey', JSON.stringify({ data: 'testValue' }));
    expect(service.has('existingKey')).toBe(true);
    expect(service.has('nonExistentKey')).toBe(false);
  });

  it('should clear the entire session', () => {
    sessionStorage.setItem('testKey', JSON.stringify({ data: 'testValue' }));
    service.clear();
    expect(sessionStorage.length).toBe(0);
  });
});
