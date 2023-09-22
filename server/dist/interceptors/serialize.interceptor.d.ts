import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
interface ClassConstructor {
    new (...args: any[]): {};
}
export declare function Serilize(dto: ClassConstructor): MethodDecorator & ClassDecorator;
export declare class SerializeInterceptor implements NestInterceptor {
    private readonly dto;
    constructor(dto: ClassConstructor);
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>>;
}
export {};
