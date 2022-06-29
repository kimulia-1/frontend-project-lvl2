#!/usr/bin/env node
import { Command } from 'commander';

const program = new Command();

program.option('-V, --version', 'output the version number').description('Compares two configuration files and shows a difference.');

program.parse();
