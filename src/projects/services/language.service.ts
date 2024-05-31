import { Injectable } from "@nestjs/common";
import { Language } from "../entities/languages.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class LanguageService {
    constructor(
        @InjectRepository(Language)
        private languageRepo: Repository<Language>
    ){}

    async findAllLang() {
        return await this.languageRepo.find();
    }

    async findOneLang(id: string) {
        return await this.languageRepo.findOneBy({ id });
    }

    async findByNameLang(name: string) {
        return await this.languageRepo.findOneBy({ name });
    }

    async createLang(language: Language) {
        return await this.languageRepo.save(language);
    }


}