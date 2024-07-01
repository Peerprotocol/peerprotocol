import * as anchor from "@project-serum/anchor";
import { useEffect, useMemo, useState } from "react";
import { PEER_PROTOCOL_PROGRAM_PUBKEY } from "../constants";
import peerIDL from "../constants/idl.json";
import toast from "react-hot-toast";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { utf8 } from "@project-serum/anchor/dist/cjs/utils/bytes";
import { findProgramAddressSync } from "@project-serum/anchor/dist/cjs/utils/pubkey";
import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import { BN } from "@project-serum/anchor";

import {
  createMint,
  getOrCreateAssociatedTokenAccount,
  getAssociatedTokenAddress,
  createAssociatedTokenAccountInstruction,
  mintTo,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { UserContextValue } from "../interface/program_interface";
// import { simulateTransaction } from "@project-serum/anchor/dist/cjs/utils/rpc";
// https://solana.stackexchange.com/questions/2912/creating-an-associated-token-account-via-solana-program
