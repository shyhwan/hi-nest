import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { NotFoundException } from '@nestjs/common';
import { after } from 'node:test';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array', () => {
      const result = service.getAll();

      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne', () => {
    it('should new movie', () => {
      service.create({
        title: 'Test Movie',
        year: 2029,
        genres: ['test'],
      });

      const movie = service.getOne(1);
      expect(movie).toBeDefined();
    });

    it('should throw a NotFoundException', () => {
      try {
        service.getOne(999);
      } catch (ex) {
        expect(ex).toBeInstanceOf(NotFoundException);
        expect(ex.message).toEqual('Movie with ID: 999 not found.');
      }
    });
  });

  describe('deleteOne', () => {
    it('deletes a movie', () => {
      service.create({
        title: 'Test Movie',
        year: 2029,
        genres: ['test'],
      });
      const beforDelete = service.getAll().length;
      service.deleteOne(1);

      const afterDelete = service.getAll().length;
      expect(afterDelete).toBeLessThan(beforDelete);
    });

    it('should throw a NotFoundException', () => {
      try {
        service.deleteOne(999);
      } catch (ex) {
        expect(ex).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('create', () => {
    it('sould create a movie', () => {
      const beforCreate = service.getAll().length;
      service.create({
        title: 'Test Movie',
        year: 2029,
        genres: ['test'],
      });
      const afterCreate = service.getAll().length;

      expect(afterCreate).toBeGreaterThan(beforCreate);
    });
  });

  describe('update', () => {
    it('should update a movie', () => {
      service.create({
        title: 'Test Movie',
        year: 2029,
        genres: ['test'],
      });

      service.update(1, { title: 'Update Title' });
      const movie = service.getOne(1);
      expect(movie.title).toEqual('Update Title');
    });

    it('should throw a NotFoundException', () => {
      try {
        service.update(999, {});
      } catch (ex) {
        expect(ex).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
