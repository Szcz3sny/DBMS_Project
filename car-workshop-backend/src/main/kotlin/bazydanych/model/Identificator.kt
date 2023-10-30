package bazydanych.model

import kotlinx.serialization.Serializable
import kotlin.jvm.JvmInline;

@Serializable
@JvmInline value class Id<T>(val value: Int)