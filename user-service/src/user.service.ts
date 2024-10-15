import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import {
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { hash, compare } from 'bcryptjs';
import { RegisterUserDto, LoginUserDto } from './schemas/user/dto/user.dto';
import { User, UserDocument } from './schemas/user/user.schema';

export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async register(registerUserData: RegisterUserDto) {
    const { username, password } = registerUserData;

    const isUserExist: boolean = await this.userModel.findOne({ username });
    if (isUserExist) {
      throw new ConflictException('Username déjà existant');
    }

    const hashedPassword = await hash(password, 10);

    const newUser = new this.userModel({
      username,
      password: hashedPassword,
    });

    await newUser.save();

    return {
      message: 'Utilisateur enregistré !',
    };
  }

  async login(loginUserData: LoginUserDto) {
    const { username, password } = loginUserData;

    const user = await this.userModel.findOne({
      username,
    });

    if (!user) {
      throw new NotFoundException('Utilisateur introuvable !');
    }

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Identifiants invalides !');
    }

    const payload = { username, sub: user._id };
    const accessToken = this.jwtService.sign(payload);

    return {
      access_token: accessToken,
    };
  }
}
