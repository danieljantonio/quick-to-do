import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
	findAll() {
		return `This action returns all users`;
	}

	findOne(id: string) {
		return `This action returns a #${id} user`;
	}
}
